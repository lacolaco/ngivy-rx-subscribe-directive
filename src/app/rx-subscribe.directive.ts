import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface RxSubscribeContext<T> {
  $implicit: T;
}

@Directive({
  selector: "[rxSubscribe]"
})
export class RxSubscribeDirective<T> implements OnInit, OnDestroy {
  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<RxSubscribeContext<T>>
  ) {}
  @Input("rxSubscribe")
  source$: Observable<T>;

  private readonly onDestroy$ = new Subject();

  static ngTemplateContextGuard<T>(
    dir: RxSubscribeDirective<T>,
    ctx: unknown
  ): ctx is RxSubscribeContext<T> {
    return true;
  }

  ngOnInit() {
    let viewRef: EmbeddedViewRef<RxSubscribeContext<T>>;
    this.source$.pipe(takeUntil(this.onDestroy$)).subscribe(source => {
      if (!viewRef) {
        viewRef = this.vcRef.createEmbeddedView(this.templateRef, {
          $implicit: source
        });
      } else {
        viewRef.context.$implicit = source;
        viewRef.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}

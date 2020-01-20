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

export interface RxSubscribeFromContext<T> {
  $implicit: T;
}

@Directive({
  selector: "[rxSubscribe],[rxSubscribeFrom]"
})
export class RxSubscribeFromDirective<T> implements OnInit, OnDestroy {
  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<RxSubscribeFromContext<T>>
  ) {}
  @Input("rxSubscribeFrom")
  source$: Observable<T>;

  private readonly onDestroy$ = new Subject();

  static ngTemplateContextGuard<T>(
    dir: RxSubscribeFromDirective<T>,
    ctx: unknown
  ): ctx is RxSubscribeFromContext<T> {
    return true;
  }

  ngOnInit() {
    let viewRef: EmbeddedViewRef<RxSubscribeFromContext<T>>;
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

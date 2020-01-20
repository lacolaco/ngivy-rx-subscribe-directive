import { Component } from "@angular/core";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  source$ = interval(1000).pipe(map(i => ({ count: i })));
}

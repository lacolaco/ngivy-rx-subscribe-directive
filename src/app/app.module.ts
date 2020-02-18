import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RxSubscribeDirective } from "./rx-subscribe.directive";

@NgModule({
  declarations: [AppComponent, RxSubscribeDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RxSubscribeFromDirective } from "./rx-subscribe.directive";

@NgModule({
  declarations: [AppComponent, RxSubscribeFromDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

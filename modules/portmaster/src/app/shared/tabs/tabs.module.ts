import { NgModule } from "@angular/core";
import { TabGroupComponent } from "./tab-group";
import { TabComponent, TabContentDirective, TabOutletComponent } from "./tab";
import { CommonModule } from "@angular/common";
import { PortalModule } from "@angular/cdk/portal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TipUpModule } from "../tipup";

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    TipUpModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TabContentDirective,
    TabComponent,
    TabGroupComponent,
    TabOutletComponent,
  ],
  exports: [
    TabContentDirective,
    TabComponent,
    TabGroupComponent
  ]
})
export class TabModule { }

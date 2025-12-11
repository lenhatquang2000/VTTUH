import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MobileHeaderComponent } from "../mobile-header/mobile-header.component";
import { SubHeaderComponent } from "../sub-header/sub-header.component";
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    imports: [MobileHeaderComponent, SubHeaderComponent, RouterModule],
})
export class HeaderComponent {

}
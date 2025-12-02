import { Component } from "@angular/core";
import { MobileHeaderComponent } from "../mobile-header/mobile-header.component";
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    imports: [MobileHeaderComponent],
})
export class HeaderComponent {

}
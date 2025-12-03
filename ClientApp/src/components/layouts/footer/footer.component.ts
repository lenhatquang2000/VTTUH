import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class FooterComponent {
    currentYear: number = new Date().getFullYear();
}
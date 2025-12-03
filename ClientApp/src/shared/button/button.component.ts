import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'] // <-- ĐÚNG!!!
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() active: boolean = false;
  @Input() className: string = '';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}

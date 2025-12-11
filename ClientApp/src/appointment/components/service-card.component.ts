import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../services/booking.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() service!: Service;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<Service>();

  onSelect(): void {
    this.selected.emit(this.service);
  }
}


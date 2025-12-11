import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../services/booking.service';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {
  @Input() doctor!: Doctor;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<Doctor>();

  onSelect(): void {
    this.selected.emit(this.doctor);
  }
}


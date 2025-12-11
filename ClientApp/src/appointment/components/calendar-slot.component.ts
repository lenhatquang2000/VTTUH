import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addDays, format, startOfWeek, isSameDay, isPast, isToday } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-calendar-slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-slot.component.html',
  styleUrl: './calendar-slot.component.css'
})
export class CalendarSlotComponent implements OnInit {
  @Input() slots: any[] = [];
  @Input() selectedDate: Date | null = null;
  @Input() selectedTime: string | null = null;
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() timeSelected = new EventEmitter<string>();

  weekStart: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  weekDays: Date[] = [];
  timeFilter: 'all' | 'morning' | 'afternoon' | 'evening' = 'all';
  filteredSlots: any[] = [];

  ngOnInit(): void {
    this.updateWeekDays();
    this.updateFilteredSlots();
  }

  updateWeekDays(): void {
    this.weekDays = Array.from({ length: 7 }, (_, i) => addDays(this.weekStart, i));
  }

  get weekRange(): string {
    const start = format(this.weekStart, 'dd/MM', { locale: vi });
    const end = format(addDays(this.weekStart, 6), 'dd/MM/yyyy', { locale: vi });
    return `${start} - ${end}`;
  }

  previousWeek(): void {
    this.weekStart = addDays(this.weekStart, -7);
    this.updateWeekDays();
  }

  nextWeek(): void {
    this.weekStart = addDays(this.weekStart, 7);
    this.updateWeekDays();
  }

  isToday(day: Date): boolean {
    return isToday(day);
  }

  isSelected(day: Date): boolean {
    return this.selectedDate ? isSameDay(day, this.selectedDate) : false;
  }

  isDisabled(day: Date): boolean {
    return isPast(day) && !isToday(day);
  }

  getDayName(day: Date): string {
    return format(day, 'EEE', { locale: vi });
  }

  getDayNumber(day: Date): string {
    return format(day, 'd');
  }

  getMonth(day: Date): string {
    return format(day, 'MMM', { locale: vi });
  }

  getAvailableSlots(day: Date): number {
    const dayStr = format(day, 'yyyy-MM-dd');
    return this.slots.filter(s => s.date === dayStr && s.available).length;
  }

  selectDate(day: Date): void {
    if (!this.isDisabled(day)) {
      this.selectedDate = day;
      this.dateSelected.emit(day);
      this.updateFilteredSlots();
    }
  }

  setTimeFilter(filter: 'all' | 'morning' | 'afternoon' | 'evening'): void {
    this.timeFilter = filter;
    this.updateFilteredSlots();
  }

  updateFilteredSlots(): void {
    if (!this.selectedDate) {
      this.filteredSlots = [];
      return;
    }

    const dayStr = format(this.selectedDate, 'yyyy-MM-dd');
    let filtered = this.slots.filter(s => s.date === dayStr && s.available);

    if (this.timeFilter === 'morning') {
      filtered = filtered.filter(s => {
        const hour = parseInt(s.time.split(':')[0]);
        return hour < 12;
      });
    } else if (this.timeFilter === 'afternoon') {
      filtered = filtered.filter(s => {
        const hour = parseInt(s.time.split(':')[0]);
        return hour >= 12 && hour < 17;
      });
    } else if (this.timeFilter === 'evening') {
      filtered = filtered.filter(s => {
        const hour = parseInt(s.time.split(':')[0]);
        return hour >= 17;
      });
    }

    this.filteredSlots = filtered.sort((a, b) => a.time.localeCompare(b.time));
  }

  isSlotSelected(slot: any): boolean {
    return this.selectedTime === slot.time;
  }

  selectTimeSlot(slot: any): void {
    if (slot.available) {
      this.selectedTime = slot.time;
      this.timeSelected.emit(slot.time);
    }
  }

  formatSelectedDate(): string {
    if (!this.selectedDate) return '';
    return format(this.selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi });
  }
}


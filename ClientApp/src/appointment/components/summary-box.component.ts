import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-summary-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-box.component.html',
  styleUrl: './summary-box.component.css'
})
export class SummaryBoxComponent {
  @Input() summary: any = {};

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'EEEE, dd/MM/yyyy', { locale: vi });
  }

  formatCurrency(amount: number): string {
    if (!amount) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
}


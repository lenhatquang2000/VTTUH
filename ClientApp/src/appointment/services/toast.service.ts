import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Array<{ id: number; message: string; type: ToastType }> = [];
  private toastIdCounter = 0;

  getToasts() {
    return this.toasts;
  }

  show(message: string, type: ToastType = 'info', duration: number = 3000): void {
    const id = this.toastIdCounter++;
    this.toasts.push({ id, message, type });

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error', 5000);
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }
}


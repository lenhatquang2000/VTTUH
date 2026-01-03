import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface InvoiceResult {
  invoiceCode: string;
  invoiceDate: string;
  patientName: string;
  totalAmount: number;
  status: 'issued' | 'cancelled' | 'pending';
  downloadUrl: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent {
  // Search form
  searchCode = '';
  searchPhone = '';
  searchDate = '';
  
  // State
  isSearching = signal(false);
  searchResult = signal<InvoiceResult | null>(null);
  searchError = signal<string | null>(null);
  hasSearched = signal(false);

  stats = [
    { icon: 'bi-file-earmark-check', value: '100K+', label: 'Hóa đơn đã phát hành', color: '#0EA5E9' },
    { icon: 'bi-shield-check', value: '100%', label: 'Xác thực an toàn', color: '#10B981' },
    { icon: 'bi-clock', value: '24/7', label: 'Tra cứu mọi lúc', color: '#6366F1' },
    { icon: 'bi-download', value: 'PDF', label: 'Tải về dễ dàng', color: '#F59E0B' }
  ];

  faqs: FaqItem[] = [
    {
      question: 'Hóa đơn điện tử là gì?',
      answer: 'Hóa đơn điện tử là hóa đơn được tạo lập, lưu trữ, gửi và nhận bằng phương tiện điện tử. Hóa đơn điện tử có giá trị pháp lý tương đương hóa đơn giấy.'
    },
    {
      question: 'Làm thế nào để tra cứu hóa đơn?',
      answer: 'Bạn có thể tra cứu hóa đơn bằng cách nhập mã hóa đơn hoặc số điện thoại đã đăng ký khi khám bệnh. Hệ thống sẽ hiển thị thông tin hóa đơn và cho phép tải về.'
    },
    {
      question: 'Tôi có thể tải hóa đơn về máy không?',
      answer: 'Có, sau khi tra cứu thành công, bạn có thể tải hóa đơn về dưới dạng file PDF để lưu trữ hoặc in ra khi cần.'
    },
    {
      question: 'Hóa đơn điện tử có thể dùng để quyết toán thuế không?',
      answer: 'Có, hóa đơn điện tử được pháp luật công nhận và có thể sử dụng để kê khai, quyết toán thuế thu nhập cá nhân, bảo hiểm y tế.'
    },
    {
      question: 'Tôi không nhận được hóa đơn điện tử, phải làm sao?',
      answer: 'Vui lòng kiểm tra lại thông tin số điện thoại, email đã cung cấp. Nếu vẫn không nhận được, hãy liên hệ hotline 0293 3953 888 để được hỗ trợ.'
    }
  ];

  searchInvoice(): void {
    if (!this.searchCode && !this.searchPhone) {
      this.searchError.set('Vui lòng nhập mã hóa đơn hoặc số điện thoại');
      return;
    }

    this.isSearching.set(true);
    this.searchError.set(null);
    this.searchResult.set(null);
    this.hasSearched.set(true);

    // Simulate API call
    setTimeout(() => {
      // Mock result - in real app, this would be an API call
      if (this.searchCode === 'HD123456' || this.searchPhone === '0901234567') {
        this.searchResult.set({
          invoiceCode: 'HD123456',
          invoiceDate: '2026-01-02',
          patientName: 'Nguyễn Văn A',
          totalAmount: 1500000,
          status: 'issued',
          downloadUrl: '/api/invoice/download/HD123456'
        });
      } else if (this.searchCode || this.searchPhone) {
        this.searchError.set('Không tìm thấy hóa đơn với thông tin đã nhập. Vui lòng kiểm tra lại.');
      }
      this.isSearching.set(false);
    }, 1500);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'issued': 'Đã phát hành',
      'cancelled': 'Đã hủy',
      'pending': 'Đang xử lý'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'issued': 'bg-success',
      'cancelled': 'bg-danger',
      'pending': 'bg-warning text-dark'
    };
    return classes[status] || 'bg-secondary';
  }

  resetSearch(): void {
    this.searchCode = '';
    this.searchPhone = '';
    this.searchDate = '';
    this.searchResult.set(null);
    this.searchError.set(null);
    this.hasSearched.set(false);
  }
}


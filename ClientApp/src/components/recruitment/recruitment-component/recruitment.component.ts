import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract';
  location: string;
  salary: string;
  deadline: string;
  requirements: string[];
  isHot: boolean;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruitment.component.html'
})
export class RecruitmentComponent {
  stats = [
    { icon: 'bi-people-fill', value: '500+', label: 'Nhân viên', color: '#6366F1' },
    { icon: 'bi-briefcase-fill', value: '50+', label: 'Vị trí tuyển dụng', color: '#8B5CF6' },
    { icon: 'bi-building', value: '30+', label: 'Phòng ban', color: '#A855F7' },
    { icon: 'bi-heart-fill', value: '95%', label: 'Hài lòng', color: '#EC4899' }
  ];

  benefits: Benefit[] = [
    { icon: 'bi-cash-stack', title: 'Lương thưởng hấp dẫn', description: 'Mức lương cạnh tranh, thưởng theo hiệu suất và các dịp lễ' },
    { icon: 'bi-shield-check', title: 'Bảo hiểm toàn diện', description: 'BHXH, BHYT, bảo hiểm tai nạn 24/7 cho bạn và gia đình' },
    { icon: 'bi-mortarboard', title: 'Đào tạo phát triển', description: 'Cơ hội học tập, nâng cao chuyên môn liên tục' },
    { icon: 'bi-clock-history', title: 'Giờ làm linh hoạt', description: 'Cân bằng công việc - cuộc sống, nghỉ phép đầy đủ' },
    { icon: 'bi-trophy', title: 'Cơ hội thăng tiến', description: 'Lộ trình sự nghiệp rõ ràng, đề bạt từ nội bộ' },
    { icon: 'bi-hospital', title: 'Môi trường chuyên nghiệp', description: 'Làm việc với đội ngũ chuyên gia y tế hàng đầu' }
  ];

  jobPositions: JobPosition[] = [
    {
      id: 'bs-noi',
      title: 'Bác sĩ Nội tổng quát',
      department: 'Khoa Nội',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: 'Thỏa thuận',
      deadline: '2026-02-28',
      requirements: ['Tốt nghiệp Đại học Y khoa', 'Chứng chỉ hành nghề', '3+ năm kinh nghiệm'],
      isHot: true
    },
    {
      id: 'dd-icu',
      title: 'Điều dưỡng ICU',
      department: 'Khoa Hồi sức tích cực',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: '15-25 triệu',
      deadline: '2026-02-15',
      requirements: ['Cao đẳng/Đại học Điều dưỡng', 'Chứng chỉ ICU', '2+ năm kinh nghiệm'],
      isHot: true
    },
    {
      id: 'ktvxn',
      title: 'Kỹ thuật viên Xét nghiệm',
      department: 'Khoa Xét nghiệm',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: '12-18 triệu',
      deadline: '2026-02-20',
      requirements: ['Đại học Kỹ thuật Y học', 'Thành thạo thiết bị xét nghiệm', '1+ năm kinh nghiệm'],
      isHot: false
    },
    {
      id: 'duoc-si',
      title: 'Dược sĩ lâm sàng',
      department: 'Khoa Dược',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: '15-22 triệu',
      deadline: '2026-02-25',
      requirements: ['Đại học Dược', 'Chứng chỉ Dược sĩ lâm sàng', '2+ năm kinh nghiệm'],
      isHot: false
    },
    {
      id: 'it-support',
      title: 'Nhân viên IT Support',
      department: 'Phòng CNTT',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: '10-15 triệu',
      deadline: '2026-03-01',
      requirements: ['Cao đẳng/Đại học CNTT', 'Kiến thức mạng, hệ thống', 'Giao tiếp tốt'],
      isHot: false
    },
    {
      id: 'nhan-su',
      title: 'Chuyên viên Nhân sự',
      department: 'Phòng Nhân sự',
      type: 'full-time',
      location: 'Cần Thơ',
      salary: '12-18 triệu',
      deadline: '2026-02-28',
      requirements: ['Đại học Quản trị nhân lực', '2+ năm kinh nghiệm tuyển dụng', 'Kỹ năng giao tiếp tốt'],
      isHot: false
    }
  ];

  recruitmentProcess = [
    { step: 1, title: 'Nộp hồ sơ', description: 'Gửi CV và hồ sơ qua email hoặc nộp trực tiếp', icon: 'bi-envelope-paper' },
    { step: 2, title: 'Sàng lọc hồ sơ', description: 'Phòng Nhân sự xem xét và đánh giá hồ sơ', icon: 'bi-file-earmark-check' },
    { step: 3, title: 'Phỏng vấn', description: 'Phỏng vấn trực tiếp với bộ phận chuyên môn', icon: 'bi-people' },
    { step: 4, title: 'Thử việc', description: 'Thử việc 2 tháng với đầy đủ quyền lợi', icon: 'bi-clipboard-check' },
    { step: 5, title: 'Chính thức', description: 'Ký hợp đồng lao động chính thức', icon: 'bi-trophy' }
  ];

  selectedJob: JobPosition | null = null;

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'full-time': 'Toàn thời gian',
      'part-time': 'Bán thời gian',
      'contract': 'Hợp đồng'
    };
    return labels[type] || type;
  }

  getTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'full-time': 'bg-success',
      'part-time': 'bg-warning text-dark',
      'contract': 'bg-info'
    };
    return classes[type] || 'bg-secondary';
  }

  selectJob(job: JobPosition): void {
    this.selectedJob = this.selectedJob?.id === job.id ? null : job;
  }
}


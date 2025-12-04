import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Expert {
  id: number;
  name: string;
  position: string;
  specialty: string;
  avatar: string;
  description: string;
  experience: number;
  email?: string;
  linkedin?: string;
  phone?: string;
  expertise: string[];
  rating: number;
  reviews: number;
}

type SpecialtyFilter = string | "all";

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ExpertComponent implements OnInit {
  experts: Expert[] = [
    {
      id: 1,
      name: 'TS.BS. Nguyễn Văn An',
      position: 'Giám đốc Trung tâm Y tế',
      specialty: 'Nội tổng quát',
      avatar: 'assets/imgs/devs.png',
      description: 'Hơn 20 năm kinh nghiệm trong lĩnh vực nội tổng quát, đã tham gia đào tạo và hướng dẫn nhiều thế hệ bác sĩ mới.',
      experience: 20,
      email: 'nguyenvanan@hospital.vn',
      linkedin: 'https://linkedin.com/in/nguyenvanan',
      phone: '+84-123-456-789',
      expertise: ['Chẩn đoán', 'Điều trị', 'Tư vấn'],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 2,
      name: 'PGS.TS. Lê Thị Hạnh',
      position: 'Trưởng khoa Sản',
      specialty: 'Sản phụ khoa',
      avatar: 'assets/imgs/devs.png',
      description: 'Chuyên gia đầu ngành trong lĩnh vực sản phụ khoa, có nhiều công trình nghiên cứu quốc tế.',
      experience: 18,
      email: 'lethihanh@hospital.vn',
      linkedin: 'https://linkedin.com/in/lethihanh',
      phone: '+84-234-567-890',
      expertise: ['Sản khoa', 'Phụ khoa', 'Nghiên cứu'],
      rating: 4.95,
      reviews: 203
    },
    {
      id: 3,
      name: 'BS.CKI. Trần Quốc Toàn',
      position: 'Phó Khoa Ngoại',
      specialty: 'Phẫu thuật tổng quát',
      avatar: 'assets/imgs/devs.png',
      description: 'Bác sĩ có kỹ năng phẫu thuật tiêu biểu, thực hiện hàng ngàn ca mổ thành công.',
      experience: 22,
      email: 'tranquoctoan@hospital.vn',
      phone: '+84-345-678-901',
      expertise: ['Phẫu thuật', 'Ngoại khoa', 'Cấp cứu'],
      rating: 4.88,
      reviews: 189
    },
    {
      id: 4,
      name: 'ThS.BS. Phạm Minh Tâm',
      position: 'Chuyên viên tâm lý lâm sàng',
      specialty: 'Tâm lý học',
      avatar: 'assets/imgs/devs.png',
      description: 'Chuyên tư vấn tâm lý và chăm sóc sức khỏe tinh thần cho bệnh nhi và người lớn.',
      experience: 12,
      linkedin: 'https://linkedin.com/in/phamminhtam',
      phone: '+84-456-789-012',
      expertise: ['Tâm lý trị liệu', 'Tư vấn', 'Hỗ trợ cảm xúc'],
      rating: 4.92,
      reviews: 142
    },
    {
      id: 5,
      name: 'TS.BS. Nguyễn Thanh Bình',
      position: 'Trưởng khoa Nhi',
      specialty: 'Nhi khoa',
      avatar: 'assets/imgs/devs.png',
      description: 'Tận tâm với công việc, chuyên điều trị các bệnh lý hiếm gặp ở trẻ nhỏ.',
      experience: 16,
      email: 'nguyenthanhbinh@hospital.vn',
      phone: '+84-567-890-123',
      expertise: ['Nhi khoa', 'Bệnh hiếm gặp', 'Phát triển trẻ'],
      rating: 4.87,
      reviews: 178
    },
    {
      id: 6,
      name: 'BS. Vũ Minh Châu',
      position: 'Chuyên khoa Da liễu',
      specialty: 'Da liễu',
      avatar: 'assets/imgs/devs.png',
      description: 'Có kiến thức vững chắc về điều trị các bệnh ngoài da và chăm sóc thẩm mỹ.',
      experience: 14,
      email: 'vuminhchau@hospital.vn',
      phone: '+84-678-901-234',
      expertise: ['Da liễu', 'Thẩm mỹ', 'Trị liệu'],
      rating: 4.91,
      reviews: 167
    }
  ];

  // Lưu kết quả lọc ra sẵn, chỉ thay đổi khi search/filter thay đổi.
  filteredExperts: Expert[] = [];

  // Biến này chỉ đổi khi filter change, không dùng getter phía dưới
  selectedFilter: SpecialtyFilter = 'all';

  selectedExpert: Expert | null = null;
  searchText: string = '';
  specialties: string[] = [];

  ngOnInit() {
    this.extractSpecialties();
    this.applyFiltering();
  }

  extractSpecialties() {
    // Chỉ lấy unique specialty
    this.specialties = [...new Set(this.experts.map(e => e.specialty))];
  }

  // Hàm lọc hiệu quả: chỉ gọi khi filter hoặc search thay đổi.
  applyFiltering() {
    const search = this.searchText.trim().toLowerCase();

    this.filteredExperts = this.experts.filter(expert => {
      const matchSpecialty = this.selectedFilter === "all" || expert.specialty === this.selectedFilter;
      const matchSearch =
        !search ||
        expert.name.toLowerCase().includes(search) ||
        expert.specialty.toLowerCase().includes(search);
      return matchSpecialty && matchSearch;
    });
  }

  // Gọi mỗi khi đổi filter
  onFilterChange(filter: SpecialtyFilter) {
    this.selectedFilter = filter;
    this.applyFiltering();
  }

  // Gọi mỗi khi search thay đổi
  onSearch(text: string) {
    this.searchText = text;
    this.applyFiltering();
  }

  // Chỉ gọi khi click lên 1 bác sĩ
  selectExpert(expert: Expert) {
    this.selectedExpert = this.selectedExpert?.id === expert.id ? null : expert;
  }

  // Không nên có logic nặng ở template/ngFor (chỉ lấy class)
  getSpecialtyClass(specialty: string): string {
    const map: { [key: string]: string } = {
      'Nội tổng quát': 'vtth-bg-primary',
      'Sản phụ khoa': 'vtth-bg-secondary',
      'Phẫu thuật tổng quát': 'vtth-bg-danger',
      'Tâm lý học': 'vtth-bg-info',
      'Nhi khoa': 'vtth-bg-success',
      'Da liễu': 'vtth-bg-warning'
    };
    return map[specialty] || 'vtth-bg-primary';
  }
}

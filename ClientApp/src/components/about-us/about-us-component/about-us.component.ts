import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'about-us',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './about-us.component.html'
})
export class AboutUsComponent {
    stats = [
        { icon: 'bi-calendar-check', value: '2010', label: 'Năm thành lập', color: '#4A90E2' },
        { icon: 'bi-person-badge', value: '200+', label: 'Bác sĩ & Chuyên gia', color: '#6366F1' },
        { icon: 'bi-hospital', value: '500+', label: 'Giường bệnh', color: '#8B5CF6' },
        { icon: 'bi-people-fill', value: '50,000+', label: 'Bệnh nhân/năm', color: '#A855F7' }
    ];

    coreValues = [
        { icon: 'bi-heart-fill', title: 'Nhân văn', description: 'Lấy người bệnh làm trung tâm, phục vụ tận tâm' },
        { icon: 'bi-award-fill', title: 'Chuyên nghiệp', description: 'Đội ngũ giỏi chuyên môn, tác phong chuẩn mực' },
        { icon: 'bi-lightbulb-fill', title: 'Đổi mới', description: 'Tiên phong ứng dụng công nghệ y học hiện đại' },
        { icon: 'bi-tree-fill', title: 'Bền vững', description: 'Phát triển lâu dài, đóng góp cho cộng đồng' },
        { icon: 'bi-shield-check', title: 'Y đức', description: 'Tuân thủ đạo đức nghề nghiệp, minh bạch' }
    ];

    timeline = [
        { year: '2010', title: 'Thành lập', description: 'Bệnh viện Trường Đại học Võ Trường Toản chính thức thành lập' },
        { year: '2015', title: 'Mở rộng', description: 'Khánh thành tòa nhà mới, nâng quy mô lên 300 giường' },
        { year: '2018', title: 'Công nghệ', description: 'Triển khai hệ thống HIS, PACS hiện đại' },
        { year: '2020', title: 'Chống dịch', description: 'Tham gia tuyến đầu chống dịch COVID-19' },
        { year: '2023', title: 'Phát triển', description: 'Đạt 500+ giường bệnh, 200+ bác sĩ chuyên khoa' }
    ];
}
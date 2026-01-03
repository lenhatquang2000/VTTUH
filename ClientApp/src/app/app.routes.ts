import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layouts/main-layoutcomponent/main-layout.component';
import { HomeComponent } from '../components/home/homecomponent/home.component';
import { SiteSettingComponent } from '../components/setting/site-setting/site-setting.component';
import { AboutUsComponent } from '../components/about-us/about-us-component/about-us.component';
import { ExpertComponent } from '../components/expert/expert-componet/expert.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { NewsComponent } from '../components/news/news-component/news.component';
import { NewsDetailComponent } from '../components/news/news-detail/news-detail.component';
import { PatientComponent } from '../components/patient/patient-component/patient.component';
import { PatientIndexComponent } from '../components/patient/patient-index/patient-index.component';
import { PatientPageComponent } from '../components/patient/patient-page/patient-page.component';
import { StaffComponent } from '../components/staff/staff-component/staff.component';
import { StaffIndexComponent } from '../components/staff/staff-index/staff-index.component';
import { StaffPageComponent } from '../components/staff/staff-page/staff-page.component';
import { OnlineServicesComponent } from '../components/online-services/online-services-component/online-services.component';
import { QaExpertComponent } from '../components/online-services/qa-expert/qa-expert.component';
import { VaccinationComponent } from '../components/vaccination/vaccination-component/vaccination.component';
import { VaccineStatusComponent } from '../components/vaccination/vaccine-status/vaccine-status.component';
import { VaccinationProcessComponent } from '../components/vaccination/vaccination-process/vaccination-process.component';
import { VaccinationScheduleComponent } from '../components/vaccination/vaccination-schedule/vaccination-schedule.component';
import { RecruitmentComponent } from '../components/recruitment/recruitment-component/recruitment.component';
import { InvoiceComponent } from '../components/invoice/invoice-component/invoice.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        data: { name: 'main-layout' },
        children: [
            { path: '', component: HomeComponent, data: { name: 'home' } },
        ]
    },
    {
        path: 'about-us',
        component: MainLayoutComponent,
        data: { name: 'about-us-layout' },
        children: [
            { path: '', component: AboutUsComponent, data: { name: 'about-us' } },
        ],
    },
    {
        path: 'experts',
        component:MainLayoutComponent,
        children: [
            { path: '', component: ExpertComponent, data: { name: 'experts'}},
        ]
    },
    {
        path: 'dat-lich-kham',
        component: MainLayoutComponent,
        data: { name: 'appointment-layout' },
        children: [
            { path: '', component: AppointmentComponent, data: { name: 'appointment' } },
        ]
    },
    {
        path: 'news',
        component: MainLayoutComponent,
        data: { name: 'news-layout' },
        children: [
            { path: '', component: NewsComponent, data: { name: 'news' } },
            { path: ':slug', component: NewsDetailComponent, data: { name: 'news-detail' } },
        ]
    },
    {
        path: 'patient',
        component: MainLayoutComponent,
        data: { name: 'patient-layout' },
        children: [
            {
                path: '',
                component: PatientComponent,
                children: [
                    { path: '', component: PatientIndexComponent, data: { name: 'patient-index' } },
                    // Quy trình khám chữa bệnh
                    { path: 'quy-trinh-kham', component: PatientPageComponent, data: { name: 'patient-process', title: 'Quy trình khám chữa bệnh', icon: 'bi-clipboard-check' } },
                    { path: 'quy-trinh-kham/ngoai-tru', component: PatientPageComponent, data: { name: 'patient-outpatient', title: 'Quy trình khám ngoại trú', icon: 'bi-person-walking' } },
                    { path: 'quy-trinh-kham/noi-tru', component: PatientPageComponent, data: { name: 'patient-inpatient', title: 'Quy trình khám nội trú, nhập viện và xuất viện', icon: 'bi-hospital' } },
                    { path: 'quy-trinh-kham/huong-dan-noi-tru', component: PatientPageComponent, data: { name: 'patient-inpatient-guide', title: 'Hướng dẫn điều trị nội trú cho bệnh nhân', icon: 'bi-journal-text' } },
                    // Bảng giá và gói dịch vụ
                    { path: 'bang-gia', component: PatientPageComponent, data: { name: 'patient-pricing', title: 'Bảng giá và gói dịch vụ', icon: 'bi-cash-stack' } },
                    { path: 'bang-gia/dich-vu', component: PatientPageComponent, data: { name: 'patient-price-list', title: 'Bảng giá dịch vụ bệnh viện', icon: 'bi-list-ul' } },
                    { path: 'bang-gia/goi-dich-vu', component: PatientPageComponent, data: { name: 'patient-packages', title: 'Gói dịch vụ trọn gói', icon: 'bi-box-seam' } },
                    { path: 'bang-gia/giuong-benh', component: PatientPageComponent, data: { name: 'patient-beds', title: 'Giường bệnh nội trú', icon: 'bi-hospital-bed' } },
                    // Thanh toán và chính sách bảo hiểm
                    { path: 'thanh-toan', component: PatientPageComponent, data: { name: 'patient-payment', title: 'Thanh toán và chính sách bảo hiểm', icon: 'bi-credit-card' } },
                    { path: 'thanh-toan/bhyt', component: PatientPageComponent, data: { name: 'patient-insurance', title: 'Hướng dẫn thanh toán Bảo hiểm Y tế (BHYT)', icon: 'bi-shield-check' } },
                    { path: 'thanh-toan/che-do', component: PatientPageComponent, data: { name: 'patient-policies', title: 'Chế độ chính sách', icon: 'bi-file-earmark-text' } },
                    // Tiện ích trực tuyến
                    { path: 'tien-ich', component: PatientPageComponent, data: { name: 'patient-online', title: 'Hướng dẫn tiện ích trực tuyến và tra cứu', icon: 'bi-laptop' } },
                    { path: 'tien-ich/tra-cuu-ket-qua', component: PatientPageComponent, data: { name: 'patient-test-results', title: 'Tra cứu kết quả xét nghiệm trực tuyến', icon: 'bi-search' } },
                    { path: 'tien-ich/khao-sat', component: PatientPageComponent, data: { name: 'patient-feedback-form', title: 'Phiếu khảo sát mức độ hài lòng khách hàng', icon: 'bi-clipboard-heart' } },
                    // Thông tin thăm bệnh
                    { path: 'tham-benh', component: PatientPageComponent, data: { name: 'patient-visitor', title: 'Thông tin thăm bệnh và hỗ trợ', icon: 'bi-people' } },
                    { path: 'tham-benh/thong-tin', component: PatientPageComponent, data: { name: 'patient-visitor-info', title: 'Thông tin dành cho khách thăm bệnh', icon: 'bi-info-circle' } },
                    { path: 'tham-benh/huong-dan', component: PatientPageComponent, data: { name: 'patient-visitor-guide', title: 'Hướng dẫn khách hàng điều trị nội trú', icon: 'bi-book' } },
                    // Dịch vụ hỗ trợ y tế
                    { path: 'dich-vu', component: PatientPageComponent, data: { name: 'patient-services', title: 'Dịch vụ hỗ trợ y tế', icon: 'bi-heart-pulse' } },
                    { path: 'dich-vu/xe-cap-cuu', component: PatientPageComponent, data: { name: 'patient-ambulance', title: 'Đặt xe cấp cứu, đón/rước bệnh nhân', icon: 'bi-truck' } },
                    { path: 'dich-vu/cham-soc-tai-nha', component: PatientPageComponent, data: { name: 'patient-home-care', title: 'Chăm sóc tại nhà, lấy mẫu xét nghiệm tại nhà', icon: 'bi-house-heart' } },
                    { path: 'dich-vu/kham-online', component: PatientPageComponent, data: { name: 'patient-online-consult', title: 'Khám online với chuyên gia', icon: 'bi-camera-video' } },
                    // Cộng đồng
                    { path: 'cong-dong', component: PatientPageComponent, data: { name: 'patient-community', title: 'Chia sẻ yêu thương và hỗ trợ cộng đồng', icon: 'bi-heart' } },
                    { path: 'cong-dong/cau-lac-bo', component: PatientPageComponent, data: { name: 'patient-club', title: 'Câu lạc bộ bệnh nhân, hội chữ thập đỏ', icon: 'bi-people-fill' } },
                    { path: 'cong-dong/danh-sach-ho-tro', component: PatientPageComponent, data: { name: 'patient-support-list', title: 'Danh sách bệnh nhân cần hỗ trợ', icon: 'bi-list-check' } },
                    // Phản hồi
                    { path: 'phan-hoi', component: PatientPageComponent, data: { name: 'patient-feedback', title: 'Phản hồi và góp ý', icon: 'bi-chat-left-text' } },
                    { path: 'phan-hoi/hop-thu', component: PatientPageComponent, data: { name: 'patient-mailbox', title: 'Hộp thư bạn đọc', icon: 'bi-envelope' } },
                ]
            }
        ]
    },
    {
        path: 'staff',
        component: MainLayoutComponent,
        data: { name: 'staff-layout' },
        children: [
            {
                path: '',
                component: StaffComponent,
                children: [
                    { path: '', component: StaffIndexComponent, data: { name: 'staff-index' } },
                    { path: 'thong-tin-noi-bo', component: StaffPageComponent, data: { name: 'staff-internal-info', title: 'Thông tin nội bộ', icon: 'bi-building' } },
                    { path: 'dao-tao-lien-tuc', component: StaffPageComponent, data: { name: 'staff-training', title: 'Đào tạo liên tục theo nhu cầu xã hội', icon: 'bi-book' } },
                    { path: 'thong-bao-tuyen-sinh', component: StaffPageComponent, data: { name: 'staff-enrollment', title: 'Thông báo tuyển sinh/Chiêu sinh', icon: 'bi-megaphone' } },
                    { path: 'thong-bao-trung-tuyen', component: StaffPageComponent, data: { name: 'staff-admission', title: 'Thông báo trúng tuyển', icon: 'bi-check-circle' } },
                    { path: 'quyet-dinh-cap-chung-chi', component: StaffPageComponent, data: { name: 'staff-certificate', title: 'Quyết định cấp chứng chỉ, chứng nhận', icon: 'bi-award' } },
                    { path: 'hoi-nghi-hoi-thao', component: StaffPageComponent, data: { name: 'staff-conference', title: 'Hội nghị, hội thảo', icon: 'bi-people' } },
                    { path: 'hop-tac-benh-vien', component: StaffPageComponent, data: { name: 'staff-cooperation', title: 'Hợp tác các bệnh viện', icon: 'bi-handshake' } },
                    { path: 'nghien-cuu-khoa-hoc', component: StaffPageComponent, data: { name: 'staff-research', title: 'Nghiên cứu khoa học', icon: 'bi-flask' } }
                ]
            }
        ]
    },
    {
        path: 'online-services',
        component: MainLayoutComponent,
        data: { name: 'online-services-layout' },
        children: [
            { path: '', component: OnlineServicesComponent, data: { name: 'online-services' } },
            { path: 'hoi-dap', component: QaExpertComponent, data: { name: 'qa-expert', title: 'Hỏi đáp cùng chuyên gia' } }
        ]
    },
    {
        path: 'vaccination',
        component: MainLayoutComponent,
        data: { name: 'vaccination-layout' },
        children: [
            { path: '', component: VaccinationComponent, data: { name: 'vaccination' } },
            { path: 'tinh-hinh-vaccin', component: VaccineStatusComponent, data: { name: 'vaccine-status', title: 'Tình hình Vaccin' } },
            { path: 'quy-trinh', component: VaccinationProcessComponent, data: { name: 'vaccination-process', title: 'Quy trình tiêm chủng' } },
            { path: 'lich-tiem', component: VaccinationScheduleComponent, data: { name: 'vaccination-schedule', title: 'Lịch tiêm chủng' } }
        ]
    },
    {
        path: 'recruitment',
        component: MainLayoutComponent,
        data: { name: 'recruitment-layout' },
        children: [
            { path: '', component: RecruitmentComponent, data: { name: 'recruitment', title: 'Tuyển dụng' } }
        ]
    },
    {
        path: 'invoice',
        component: MainLayoutComponent,
        data: { name: 'invoice-layout' },
        children: [
            { path: '', component: InvoiceComponent, data: { name: 'invoice', title: 'Tra cứu hóa đơn điện tử' } }
        ]
    }
];

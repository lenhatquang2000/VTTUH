import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

interface Article {
  id: string | number;
  title: string;
  excerpt?: string;
  content?: string;
  date?: string; // ISO
  category?: string;
  image?: string;
  readMoreUrl?: string;
}

interface Department {
  id: string | number;
  name: string;
  excerpt?: string;
  image?: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // dữ liệu hiển thị
  featuredArticles: Article[] = [];
  latestArticles: Article[] = [];
  departments: Department[] = [];

  // Stats data
  stats = [
    { icon: 'bi-person-badge', value: '200+', label: 'Bác sĩ chuyên khoa', color: '#2FA4A9' },
    { icon: 'bi-people-fill', value: '50,000+', label: 'Bệnh nhân/năm', color: '#4A90E2' },
    { icon: 'bi-hospital', value: '30+', label: 'Chuyên khoa', color: '#5CBF90' },
    { icon: 'bi-award', value: '15+', label: 'Năm kinh nghiệm', color: '#F5B971' }
  ];

  // Quick services
  quickServices = [
    {
      title: 'Đặt lịch khám',
      description: 'Đặt lịch hẹn khám bệnh trực tuyến nhanh chóng, tiện lợi',
      icon: 'bi-calendar-check',
      route: '/dat-lich-kham',
      gradient: 'linear-gradient(135deg, #2FA4A9 0%, #23878B 100%)'
    },
    {
      title: 'Tra cứu kết quả',
      description: 'Tra cứu kết quả xét nghiệm, chẩn đoán hình ảnh online',
      icon: 'bi-file-earmark-medical',
      route: '/patient/tien-ich/tra-cuu-ket-qua',
      gradient: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)'
    },
    {
      title: 'Hỏi đáp chuyên gia',
      description: 'Tư vấn sức khỏe trực tuyến với đội ngũ bác sĩ giỏi',
      icon: 'bi-chat-heart',
      route: '/online-services/hoi-dap',
      gradient: 'linear-gradient(135deg, #5CBF90 0%, #48A97B 100%)'
    }
  ];

  // paging / UI state
  newsPage = 1;
  newsPageSize = 5;
  hasMoreNews = true;
  loadingNews = false;
  loadingDepartments = false;

  // cấu hình API (nếu bạn có API endpoins, set ở đây)
  private NEWS_API = '/api/news'; // ví dụ
  private DEPT_API = '/api/departments'; // ví dụ

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedArticles();
    this.loadLatestArticles({ reset: true });
    this.loadDepartments();
  }

  /**
   * Load featured (ví dụ 1-2 bài nổi bật)
   */
  loadFeaturedArticles(): void {
    // Nếu có API:
    // this.http.get<Article[]>(`${this.NEWS_API}/featured`).pipe(catchError(()=> of(this.mockFeatured()))).subscribe(...)
    // Tạm dùng mock fallback để giao diện rõ ràng
    this.featuredArticles = [
      {
        id: 'f1',
        title: 'CÔNG BỐ DANH SÁCH NGƯỜI ĐĂNG KÝ THỰC HÀNH CHUYÊN MÔN',
        excerpt: 'Công bố danh sách người đăng ký thực hành chuyên môn tại ...',
        date: '2025-12-01',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/f1'
      },
      {
        id: 'f2',
        title: 'CÔNG BỐ CƠ SỞ KHÁM BỆNH, CHỮA BỆNH ĐÁP ỨNG YÊU CẦU',
        excerpt: 'Công bố cơ sở khám chữa bệnh đáp ứng yêu cầu là cơ sở hướng dẫn thực hành ...',
        date: '2025-11-20',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/f2'
      }
    ];
  }

  /**
   * Load latest articles with pagination
   */
  loadLatestArticles(opts: { reset?: boolean } = {}): void {
    if (this.loadingNews) return;
    if (opts.reset) {
      this.newsPage = 1;
      this.latestArticles = [];
      this.hasMoreNews = true;
    }
    if (!this.hasMoreNews) return;

    this.loadingNews = true;

    // Nếu có API, bạn có thể request: `${this.NEWS_API}?page=${this.newsPage}&limit=${this.newsPageSize}`
    // Ví dụ sử dụng HttpClient:
    // this.http.get<Article[]>(`${this.NEWS_API}?page=${this.newsPage}&limit=${this.newsPageSize}`)
    //   .pipe(catchError(()=> of(this.mockLatest(this.newsPage, this.newsPageSize))))
    //   .subscribe(...)

    // Dùng mock data để demo UI:
    const fetched = this.mockLatest(this.newsPage, this.newsPageSize);

    // mô phỏng xử lý kết quả:
    const newItems = fetched;
    this.latestArticles = [...this.latestArticles, ...newItems];

    // nếu số item nhỏ hơn page size -> hết dữ liệu
    if (newItems.length < this.newsPageSize) {
      this.hasMoreNews = false;
    } else {
      this.newsPage++;
    }

    this.loadingNews = false;
  }

  /**
   * Load departments / khoa
   */
  loadDepartments(): void {
    this.loadingDepartments = true;

    // Nếu có API:
    // this.http.get<Department[]>(this.DEPT_API).pipe(catchError(()=> of(this.mockDepartments()))).subscribe(...)

    this.departments = this.mockDepartments();
    this.loadingDepartments = false;
  }

  /**
   * Khi người dùng bấm "Đọc thêm" / mở bài
   */
  openArticle(article: Article): void {
    // nếu article.readMoreUrl là link nội bộ
    if (article.readMoreUrl && article.readMoreUrl.startsWith('/')) {
      this.router.navigateByUrl(article.readMoreUrl);
      return;
    }

    // nếu có id, chuyển tới route chi tiết
    if (article.id) {
      this.router.navigate(['/news', article.id]);
      return;
    }

    // fallback: mở new tab tới link cụ thể
    if (article.readMoreUrl) {
      window.open(article.readMoreUrl, '_blank');
    }
  }

  /**
   * Truncate text cho excerpt
   */
  truncate(text: string | undefined, max = 120): string {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max).trim().replace(/\s+\S*$/, '') + '...';
  }

  /**
   * TrackBy giúp tối ưu ngFor
   */
  trackById(index: number, item: Article | Department): string | number {
    return (item as any).id ?? index;
  }

  /* -------------------------
     MOCK DATA (dùng nếu chưa có API)
     ------------------------- */

  private mockLatest(page = 1, limit = 5): Article[] {
    // giả lập một vài bài tin
    const all = [
      {
        id: 'n1',
        title: 'CÔNG BỐ DANH SÁCH NGƯỜI ĐĂNG KÝ THỰC HÀNH CHUYÊN MÔN',
        excerpt:
          'Công bố danh sách người đăng ký thực hành chuyên môn tại ... Thông tin chi tiết được công bố tại văn bản ...',
        date: '2025-12-01',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n1'
      },
      {
        id: 'n2',
        title: 'CÔNG BỐ CƠ SỞ KHÁM BỆNH, CHỮA BỆNH ĐÁP ỨNG YÊU CẦU',
        excerpt:
          'Căn cứ Công văn số 4688/TB-SYT của Sở Y tế thành phố Cần Thơ ...',
        date: '2025-11-20',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n2'
      },
      {
        id: 'n3',
        title: 'Thực hiện công tác tuyên truyền về chính sách, pháp luật bảo hiểm y tế',
        excerpt: 'Trung tâm y tế thực hiện nhiều hoạt động tuyên truyền ...',
        date: '2025-07-01',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n3'
      },
      {
        id: 'n4',
        title: 'Hưởng ứng Ngày Môi trường Thế giới 05/6/2025',
        excerpt: 'Thông tin hưởng ứng Ngày Môi trường thế giới và các hoạt động ...',
        date: '2025-06-05',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n4'
      },
      {
        id: 'n5',
        title: 'Tăng cường truyền thông phòng chống xâm hại trẻ em',
        excerpt: 'Kế hoạch truyền thông giai đoạn 2021-2025 ...',
        date: '2025-05-10',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n5'
      },
      {
        id: 'n6',
        title: 'Thông báo thay đổi giờ khám bệnh ngoại trú',
        excerpt: 'Bệnh viện thông báo cập nhật giờ khám bệnh ngoại trú ...',
        date: '2025-04-01',
        image: 'assets/imgs/devs.png',
        readMoreUrl: '/news/n6'
      }
    ];

    const start = (page - 1) * limit;
    return all.slice(start, start + limit);
  }

  private mockDepartments(): Department[] {
    return [
      { id: 'k1', name: 'Khoa Ngoại', image: 'assets/imgs/devs.png', link: '/khoa/ngoai' },
      { id: 'k2', name: 'Khoa Nhi', image: 'assets/imgs/devs.png', link: '/khoa/nhi' },
      { id: 'k3', name: 'Khoa Mắt', image: 'assets/imgs/devs.png', link: '/khoa/mat' },
      { id: 'k4', name: 'Khoa Xét nghiệm', image: 'assets/imgs/devs.png', link: '/khoa/xet-nghiem' },
      { id: 'k5', name: 'Khoa Nội', image: 'assets/imgs/devs.png', link: '/khoa/noi' },
      { id: 'k6', name: 'Khoa Sản', image: 'assets/imgs/devs.png', link: '/khoa/san' }
    ];
  }
}
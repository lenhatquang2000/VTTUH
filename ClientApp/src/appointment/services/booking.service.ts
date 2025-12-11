import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

// Interfaces
export interface Service {
  id: string | number;
  name: string;
  description: string;
  icon: string;
  type: 'doctor' | 'specialty' | 'lab' | 'vaccination' | 'health-check' | 'corporate' | 'psychology' | 'rehabilitation';
  requiresDoctor?: boolean;
}

export interface Department {
  id: string | number;
  name: string;
  description?: string;
}

export interface Doctor {
  id: string | number;
  name: string;
  title: string; // PGS.TS, TS, BS, etc.
  specialty: string;
  departmentId: string | number;
  avatar?: string;
  rating: number;
  appointmentsThisWeek: number;
}

export interface TimeSlot {
  id: string | number;
  time: string; // HH:mm format
  available: boolean;
  date: string; // YYYY-MM-DD
}

export interface AppointmentData {
  serviceId: string | number;
  serviceName: string;
  departmentId?: string | number;
  departmentName?: string;
  doctorId?: string | number;
  doctorName?: string;
  date: string;
  time: string;
  patientName: string;
  birthYear?: number;
  birthDate?: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  idCard?: string;
  address?: string;
  reason?: string;
  hasInsurance: boolean;
  insuranceCard?: string;
  location?: string;
  estimatedFee?: number;
}

export interface AppointmentResponse {
  appointmentId: string;
  appointmentCode: string; // PK-2025-123456
  qrCode: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_BASE = '/api';

  // State management với signals
  currentStep = signal<1 | 2 | 3>(1);
  selectedService = signal<Service | null>(null);
  selectedDepartment = signal<Department | null>(null);
  selectedDoctor = signal<Doctor | null>(null);
  selectedDate = signal<string | null>(null);
  selectedTime = signal<string | null>(null);
  appointmentData = signal<Partial<AppointmentData>>({});

  constructor(private http: HttpClient) {}

  // API calls
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.API_BASE}/services`).pipe(
      catchError(() => of(this.mockServices()))
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.API_BASE}/departments`).pipe(
      catchError(() => of(this.mockDepartments()))
    );
  }

  getDoctors(departmentId?: string | number): Observable<Doctor[]> {
    const params = departmentId ? `?departmentId=${departmentId}` : '';
    return this.http.get<Doctor[]>(`${this.API_BASE}/doctors${params}`).pipe(
      catchError(() => of(this.mockDoctors(departmentId)))
    );
  }

  getTimeSlots(doctorId: string | number, date: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(`${this.API_BASE}/slots?doctorId=${doctorId}&date=${date}`).pipe(
      catchError(() => of(this.mockTimeSlots(date)))
    );
  }

  createAppointment(data: AppointmentData): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.API_BASE}/appointments`, data).pipe(
      catchError(() => of(this.mockAppointmentResponse(data)))
    );
  }

  // Reset state
  reset(): void {
    this.currentStep.set(1);
    this.selectedService.set(null);
    this.selectedDepartment.set(null);
    this.selectedDoctor.set(null);
    this.selectedDate.set(null);
    this.selectedTime.set(null);
    this.appointmentData.set({});
  }

  // Mock data
  private mockServices(): Service[] {
    return [
      {
        id: 'doctor',
        name: 'Khám bác sĩ theo yêu cầu',
        description: 'Chọn bác sĩ cụ thể để khám',
        icon: 'bi-person-badge',
        type: 'doctor',
        requiresDoctor: true
      },
      {
        id: 'specialty',
        name: 'Khám chuyên khoa',
        description: 'Khám theo chuyên khoa (Nội, Ngoại, Sản, Nhi...)',
        icon: 'bi-hospital',
        type: 'specialty',
        requiresDoctor: true
      },
      {
        id: 'lab',
        name: 'Xét nghiệm',
        description: 'Xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh',
        icon: 'bi-flask',
        type: 'lab',
        requiresDoctor: false
      },
      {
        id: 'vaccination',
        name: 'Tiêm chủng - Vắc-xin',
        description: 'Tiêm các loại vắc-xin phòng bệnh',
        icon: 'bi-shield-plus',
        type: 'vaccination',
        requiresDoctor: false
      },
      {
        id: 'health-check',
        name: 'Khám sức khỏe tổng quát & Gói khám',
        description: 'Khám sức khỏe định kỳ và các gói khám',
        icon: 'bi-heart-pulse',
        type: 'health-check',
        requiresDoctor: false
      },
      {
        id: 'corporate',
        name: 'Khám doanh nghiệp',
        description: 'Dịch vụ khám sức khỏe cho doanh nghiệp',
        icon: 'bi-building',
        type: 'corporate',
        requiresDoctor: false
      },
      {
        id: 'psychology',
        name: 'Tư vấn tâm lý',
        description: 'Tư vấn và hỗ trợ tâm lý',
        icon: 'bi-emoji-smile',
        type: 'psychology',
        requiresDoctor: true
      },
      {
        id: 'rehabilitation',
        name: 'Phục hồi chức năng - Vật lý trị liệu',
        description: 'Vật lý trị liệu và phục hồi chức năng',
        icon: 'bi-activity',
        type: 'rehabilitation',
        requiresDoctor: true
      }
    ];
  }

  private mockDepartments(): Department[] {
    return [
      { id: 1, name: 'Khoa Nội', description: 'Khám và điều trị các bệnh nội khoa' },
      { id: 2, name: 'Khoa Ngoại', description: 'Phẫu thuật và điều trị ngoại khoa' },
      { id: 3, name: 'Khoa Sản', description: 'Sản phụ khoa' },
      { id: 4, name: 'Khoa Nhi', description: 'Nhi khoa' },
      { id: 5, name: 'Khoa Tim mạch', description: 'Tim mạch' },
      { id: 6, name: 'Khoa Thần kinh', description: 'Thần kinh' },
      { id: 7, name: 'Khoa Mắt', description: 'Mắt' },
      { id: 8, name: 'Khoa Tai mũi họng', description: 'Tai mũi họng' },
      { id: 9, name: 'Khoa Răng hàm mặt', description: 'Răng hàm mặt' },
      { id: 10, name: 'Khoa Da liễu', description: 'Da liễu' },
      { id: 11, name: 'Khoa Cơ xương khớp', description: 'Cơ xương khớp' },
      { id: 12, name: 'Khoa Tiêu hóa', description: 'Tiêu hóa' },
      { id: 13, name: 'Khoa Hô hấp', description: 'Hô hấp' },
      { id: 14, name: 'Khoa Nội tiết', description: 'Nội tiết' }
    ];
  }

  private mockDoctors(departmentId?: string | number): Doctor[] {
    const doctors: Doctor[] = [
      {
        id: 1,
        name: 'Nguyễn Văn A',
        title: 'PGS.TS',
        specialty: 'Tim mạch',
        departmentId: 5,
        rating: 4.8,
        appointmentsThisWeek: 45
      },
      {
        id: 2,
        name: 'Trần Thị B',
        title: 'TS.BS',
        specialty: 'Nhi khoa',
        departmentId: 4,
        rating: 4.9,
        appointmentsThisWeek: 52
      },
      {
        id: 3,
        name: 'Lê Văn C',
        title: 'BS.CKII',
        specialty: 'Nội khoa',
        departmentId: 1,
        rating: 4.7,
        appointmentsThisWeek: 38
      },
      {
        id: 4,
        name: 'Phạm Thị D',
        title: 'PGS.TS',
        specialty: 'Sản phụ khoa',
        departmentId: 3,
        rating: 4.9,
        appointmentsThisWeek: 48
      }
    ];

    if (departmentId) {
      return doctors.filter(d => d.departmentId === departmentId);
    }
    return doctors;
  }

  private mockTimeSlots(date: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                   '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
    
    times.forEach((time, index) => {
      slots.push({
        id: `${date}-${time}`,
        time,
        date,
        available: index % 3 !== 0 // Một số slot không available
      });
    });

    return slots;
  }

  private mockAppointmentResponse(data: AppointmentData): AppointmentResponse {
    const code = `PK-2025-${Math.floor(Math.random() * 1000000)}`;
    return {
      appointmentId: code,
      appointmentCode: code,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${code}`,
      message: 'Đặt lịch thành công!'
    };
  }
}


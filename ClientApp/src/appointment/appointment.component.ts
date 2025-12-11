import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';

import { BookingService, Service, Doctor, Department, TimeSlot, AppointmentData, AppointmentResponse } from './services/booking.service';
import { ToastService } from './services/toast.service';
import { StepIndicatorComponent } from './components/step-indicator.component';
import { ServiceCardComponent } from './components/service-card.component';
import { DoctorCardComponent } from './components/doctor-card.component';
import { CalendarSlotComponent } from './components/calendar-slot.component';
import { PatientFormComponent } from './components/patient-form.component';
import { SummaryBoxComponent } from './components/summary-box.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StepIndicatorComponent,
    ServiceCardComponent,
    DoctorCardComponent,
    CalendarSlotComponent,
    PatientFormComponent,
    SummaryBoxComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  // Step management
  currentStep: number = 1;

  // Step 1: Services
  services: Service[] = [];
  selectedService: Service | null = null;
  loadingServices: boolean = false;

  // Step 2: Departments, Doctors, Slots
  departments: Department[] = [];
  doctors: Doctor[] = [];
  timeSlots: TimeSlot[] = [];
  selectedDepartment: Department | null = null;

  // Getter để đảm bảo TypeScript nhận diện đúng kiểu
  get departmentsList(): Department[] {
    return this.departments;
  }
  selectedDoctor: Doctor | null = null;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  loadingDoctors: boolean = false;
  loadingSlots: boolean = false;

  // Step 3: Patient form
  @ViewChild('patientForm') patientForm?: PatientFormComponent;
  patientFormData: any = {};
  showSuccessModal: boolean = false;
  appointmentResponse: AppointmentResponse | null = null;

  // Summary data
  summary: any = {};

  private subscriptions: Subscription[] = [];

  constructor(
    private bookingService: BookingService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Step 1: Load and select service
  loadServices(): void {
    this.loadingServices = true;
    const sub = this.bookingService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services;
        this.loadingServices = false;
      },
      error: () => {
        this.toastService.error('Không thể tải danh sách dịch vụ');
        this.loadingServices = false;
      }
    });
    this.subscriptions.push(sub);
  }

  onServiceSelected(service: Service): void {
    this.selectedService = service;
    this.bookingService.selectedService.set(service);
    this.summary.serviceName = service.name;

    // Load departments if needed
    if (service.requiresDoctor) {
      this.loadDepartments();
    }
  }

  loadDepartments(): void {
    const sub = this.bookingService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: () => {
        this.toastService.error('Không thể tải danh sách chuyên khoa');
      }
    });
    this.subscriptions.push(sub);
  }

  onDepartmentSelected(department: Department): void {
    this.selectedDepartment = department;
    this.bookingService.selectedDepartment.set(department);
    this.summary.departmentName = department.name;
    this.loadDoctors(department.id);
  }

  loadDoctors(departmentId?: string | number): void {
    this.loadingDoctors = true;
    const sub = this.bookingService.getDoctors(departmentId).subscribe({
      next: (doctors: Doctor[]) => {
        this.doctors = doctors;
        this.loadingDoctors = false;
      },
      error: () => {
        this.toastService.error('Không thể tải danh sách bác sĩ');
        this.loadingDoctors = false;
      }
    });
    this.subscriptions.push(sub);
  }

  onDoctorSelected(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.bookingService.selectedDoctor.set(doctor);
    this.summary.doctorName = `${doctor.title} ${doctor.name}`;
    this.summary.location = `Phòng 302 – Tầng 3 – ${doctor.specialty}`;
    this.summary.estimatedFee = 550000;
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.bookingService.selectedDate.set(format(date, 'yyyy-MM-dd'));
    if (this.selectedDoctor) {
      this.loadTimeSlots(this.selectedDoctor.id, format(date, 'yyyy-MM-dd'));
    }
  }

  onTimeSelected(time: string): void {
    this.selectedTime = time;
    this.bookingService.selectedTime.set(time);
    this.summary.time = time;
  }

  loadTimeSlots(doctorId: string | number, date: string): void {
    this.loadingSlots = true;
    const sub = this.bookingService.getTimeSlots(doctorId, date).subscribe({
      next: (slots: TimeSlot[]) => {
        this.timeSlots = slots;
        this.loadingSlots = false;
      },
      error: () => {
        this.toastService.error('Không thể tải khung giờ');
        this.loadingSlots = false;
      }
    });
    this.subscriptions.push(sub);
  }

  // Navigation
  nextStep(): void {
    if (this.canProceedToNextStep()) {
      this.currentStep++;
      this.bookingService.currentStep.set(this.currentStep as 1 | 2 | 3);
      
      if (this.currentStep === 2 && this.selectedService?.requiresDoctor && !this.selectedDepartment) {
        // Auto load departments if needed
        this.loadDepartments();
      }
    } else {
      this.toastService.warning('Vui lòng hoàn thành các bước trước');
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.bookingService.currentStep.set(this.currentStep as 1 | 2 | 3);
    }
  }

  canProceedToNextStep(): boolean {
    if (this.currentStep === 1) {
      return !!this.selectedService;
    }
    if (this.currentStep === 2) {
      if (this.selectedService?.requiresDoctor) {
        return !!this.selectedDoctor && !!this.selectedDate && !!this.selectedTime;
      }
      return !!this.selectedDate && !!this.selectedTime;
    }
    return true;
  }

  // Step 3: Submit appointment
  submitAppointment(): void {
    // Get form data from patient form component
    if (!this.patientForm) {
      this.toastService.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    const formData = this.patientForm.patientForm.value;
    if (!this.patientForm.patientForm.valid) {
      this.patientForm.onSubmit();
      return;
    }
    
    this.onPatientFormSubmit(formData);
  }

  onPatientFormSubmit(formData: any): void {
    if (!this.canProceedToNextStep()) {
      this.toastService.warning('Vui lòng hoàn thành các bước trước');
      return;
    }

    const appointmentData: AppointmentData = {
      serviceId: this.selectedService!.id,
      serviceName: this.selectedService!.name,
      departmentId: this.selectedDepartment?.id,
      departmentName: this.selectedDepartment?.name,
      doctorId: this.selectedDoctor?.id,
      doctorName: this.selectedDoctor ? `${this.selectedDoctor.title} ${this.selectedDoctor.name}` : undefined,
      date: format(this.selectedDate!, 'yyyy-MM-dd'),
      time: this.selectedTime!,
      patientName: formData.patientName,
      birthYear: formData.birthYear,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      idCard: formData.idCard,
      address: formData.address,
      reason: formData.reason,
      hasInsurance: formData.hasInsurance || false,
      insuranceCard: formData.insuranceCard,
      location: this.summary.location,
      estimatedFee: this.summary.estimatedFee
    };

    const sub = this.bookingService.createAppointment(appointmentData).subscribe({
      next: (response: AppointmentResponse) => {
        this.appointmentResponse = response;
        this.showSuccessModal = true;
        this.toastService.success('Đặt lịch thành công!');
      },
      error: () => {
        this.toastService.error('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
      }
    });
    this.subscriptions.push(sub);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.bookingService.reset();
    this.resetForm();
  }

  resetForm(): void {
    this.currentStep = 1;
    this.selectedService = null;
    this.selectedDepartment = null;
    this.selectedDoctor = null;
    this.selectedDate = null;
    this.selectedTime = null;
    this.patientFormData = {};
    this.summary = {};
    this.services = [];
    this.departments = [];
    this.doctors = [];
    this.timeSlots = [];
    this.loadServices();
  }

  downloadPDF(): void {
    // TODO: Implement PDF download
    this.toastService.info('Tính năng tải PDF đang được phát triển');
  }

  addToCalendar(): void {
    // TODO: Implement calendar integration
    this.toastService.info('Tính năng thêm vào lịch đang được phát triển');
  }

  trackByDeptId(index: number, dept: Department): string | number {
    return dept.id;
  }

  isDepartmentSelected(dept: Department): boolean {
    return !!this.selectedDepartment && this.selectedDepartment.id === dept.id;
  }
}


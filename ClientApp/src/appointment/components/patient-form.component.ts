import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent implements OnChanges {
  @Input() formData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  patientForm: FormGroup;
  hasInsurance: boolean = false;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      patientName: ['', [Validators.required]],
      birthYear: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      birthDate: [''],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(0|\+84)[3-9][0-9]{8}$/)]],
      email: ['', [Validators.email]],
      idCard: [''],
      address: [''],
      reason: [''],
      hasInsurance: [false],
      insuranceCard: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.patientForm.patchValue(this.formData);
      this.hasInsurance = this.formData.hasInsurance || false;
    }
  }

  onInsuranceChange(event: any): void {
    this.hasInsurance = event.target.checked;
    this.patientForm.patchValue({ hasInsurance: this.hasInsurance });
    if (!this.hasInsurance) {
      this.patientForm.patchValue({ insuranceCard: '' });
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.formSubmit.emit(this.patientForm.value);
    } else {
      Object.keys(this.patientForm.controls).forEach(key => {
        this.patientForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.patientForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (field?.hasError('pattern')) {
      return 'Số điện thoại không đúng định dạng';
    }
    if (field?.hasError('email')) {
      return 'Email không đúng định dạng';
    }
    return '';
  }
}


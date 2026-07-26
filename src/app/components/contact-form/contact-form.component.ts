import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ProjectType } from '../../shared/models/contact.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, IconComponent],
  template: `
    <div
      id="contact"
      class="bg-white border border-border-base rounded-2xl p-6 sm:p-10 shadow-xs max-w-3xl mx-auto"
    >
      @if (status() === 'SUCCESS') {
        <!-- Success State Overlay -->
        <div class="text-center py-8 space-y-6 animate-fade-in">
          <div class="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
            <app-icon name="check" [size]="28" [strokeWidth]="2.5" />
          </div>
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-heading">Inquiry Received</h3>
            <p class="text-sm text-paragraph max-w-md mx-auto leading-relaxed">
              Thank you for contacting us. We've received your inquiry and will get back to you soon.
            </p>
          </div>
          <div>
            <app-button variant="outline" (onClick)="resetForm()">
              Send Another Inquiry
            </app-button>
          </div>
        </div>
      } @else {
        <!-- Interactive Form Header -->
        <div class="mb-10 text-center sm:text-left">
          <h3 class="text-2xl font-bold text-heading mb-2">Have a Project in Mind?</h3>
          <p class="text-sm text-paragraph">
            Tell us about your project requirements and we will reply as soon as possible.
          </p>
        </div>

        <!-- Typed Reactive Form -->
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Name -->
            <div class="space-y-2">
              <label for="name" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="John Doe"
                [class]="inputClasses('name')"
              />
              @if (isFieldInvalid('name')) {
                <p class="text-xs text-red-500 font-medium">Name is required.</p>
              }
            </div>

            <!-- Company -->
            <div class="space-y-2">
              <label for="company" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Company <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="company"
                type="text"
                formControlName="company"
                placeholder="Acme Corp"
                [class]="inputClasses('company')"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="john@example.com"
                [class]="inputClasses('email')"
              />
              @if (isFieldInvalid('email')) {
                <p class="text-xs text-red-500 font-medium">
                  @if (contactForm.get('email')?.hasError('required')) {
                    Email is required.
                  } @else {
                    Invalid email address format.
                  }
                </p>
              }
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label for="phone" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Phone Number <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                placeholder="+1 (555) 000-0000"
                [class]="inputClasses('phone')"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <!-- Project Type Dropdown -->
            <div class="space-y-2">
              <label for="projectType" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Project Type <span class="text-red-500">*</span>
              </label>
              <select
                id="projectType"
                formControlName="projectType"
                [class]="inputClasses('projectType')"
              >
                <option value="" disabled selected>Select an option</option>
                @for (type of projectTypes; track type) {
                  <option [value]="type">{{ type }}</option>
                }
              </select>
              @if (isFieldInvalid('projectType')) {
                <p class="text-xs text-red-500 font-medium">Please select a project type.</p>
              }
            </div>

            <!-- Budget (Optional) -->
            <div class="space-y-2">
              <label for="budget" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Budget <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <select id="budget" formControlName="budget" [class]="inputClasses('budget')">
                <option value="" disabled selected>Select budget range</option>
                <option value="< $10,000">&lt; $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
            </div>

            <!-- Timeline (Optional) -->
            <div class="space-y-2">
              <label for="timeline" class="block text-xs font-bold text-heading uppercase tracking-wider">
                Timeline <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <select id="timeline" formControlName="timeline" [class]="inputClasses('timeline')">
                <option value="" disabled selected>Select timeline</option>
                <option value="< 1 month">&lt; 1 month</option>
                <option value="1 - 3 months">1 - 3 months</option>
                <option value="3 - 6 months">3 - 6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-2">
            <label for="message" class="block text-xs font-bold text-heading uppercase tracking-wider">
              Project Details <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              formControlName="message"
              rows="5"
              placeholder="Describe your project goals, timelines, and constraints in detail..."
              [class]="inputClasses('message')"
            ></textarea>
            @if (isFieldInvalid('message')) {
              <p class="text-xs text-red-500 font-medium">
                @if (contactForm.get('message')?.hasError('required')) {
                  Project description is required.
                } @else {
                  Please provide a bit more detail (minimum 15 characters).
                }
              </p>
            }
          </div>

          <!-- Submission & Privacy Note -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-base">
            <p class="text-xs text-paragraph text-center sm:text-left">
              🔒 <span class="font-medium text-heading">Privacy Note:</span> Your information is kept confidential and will never be shared.
            </p>
            <app-button
              type="submit"
              variant="primary"
              [loading]="status() === 'SUBMITTING'"
              customClass="w-full sm:w-auto"
            >
              Send Inquiry
              <app-icon name="arrow-right" [size]="18" />
            </app-button>
          </div>

          @if (status() === 'ERROR') {
            <p class="text-sm text-red-500 font-semibold text-center mt-4">
              Something went wrong while sending your inquiry. Please try again later.
            </p>
          }
        </form>
      }
    </div>
  `,
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly status = this.contactService.status;

  projectTypes: ProjectType[] = [
    'Business Website',
    'Web Application',
    'Backend/API',
    'AI Solution',
    'Automation',
    'Other',
  ];

  contactForm = this.fb.group({
    name: ['', Validators.required],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    projectType: ['', Validators.required],
    budget: [''],
    timeline: [''],
    message: ['', [Validators.required, Validators.minLength(15)]],
  });

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  inputClasses(field: string): string {
    const base = 'w-full px-4 py-2.5 rounded-lg border text-sm text-heading placeholder:text-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent';
    const isInvalid = this.isFieldInvalid(field);
    return isInvalid
      ? `${base} border-red-300 focus:ring-red-500/20 focus:border-red-500`
      : `${base} border-border-base focus:ring-primary/20 focus:border-primary`;
  }

  onSubmit(): void {
    if (this.status() === 'SUBMITTING') {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const rawValue = this.contactForm.value;
    const payload = {
      name: (rawValue.name || '').trim(),
      company: (rawValue.company || '').trim(),
      email: (rawValue.email || '').trim(),
      phone: (rawValue.phone || '').trim(),
      projectType: rawValue.projectType as any,
      budget: rawValue.budget || '',
      timeline: rawValue.timeline || '',
      message: (rawValue.message || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.projectType || !payload.message) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactService.submitInquiry(payload).then(() => {
      // Reset form only after successful submission
      this.contactForm.reset({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
      });
    }).catch(() => {
      // Retain values on error so user can correct and retry
    });
  }

  resetForm(): void {
    this.contactService.resetStatus();
    this.contactForm.reset({
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    });
  }
}

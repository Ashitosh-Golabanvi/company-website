import { Injectable, signal } from '@angular/core';
import { ContactInquiry } from '../../shared/models/contact.model';
import { environment } from '../../../environments/environment';

export type SubmissionStatus = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly statusSignal = signal<SubmissionStatus>('IDLE');
  readonly status = this.statusSignal.asReadonly();

  /**
   * Submits a contact inquiry to the configured email provider.
   */
  async submitInquiry(inquiry: ContactInquiry): Promise<void> {
    this.statusSignal.set('SUBMITTING');

    try {
      switch (environment.emailProvider) {
        case 'WEB3FORMS':
          await this.sendWithWeb3Forms(inquiry);
          break;
        case 'FORMSUBMIT':
          await this.sendWithFormSubmit(inquiry);
          break;
        case 'EMAILJS':
          await this.sendWithEmailJS(inquiry);
          break;
        default:
          throw new Error(`Unsupported email provider: ${environment.emailProvider}`);
      }

      // Log to local storage for local verification and audit history
      try {
        const currentInquiries = localStorage.getItem('agency_inquiries');
        const list = currentInquiries ? JSON.parse(currentInquiries) : [];
        list.push({
          ...inquiry,
          provider: environment.emailProvider,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('agency_inquiries', JSON.stringify(list));
      } catch (err) {
        console.warn('Failed to cache inquiry to localStorage:', err);
      }

      this.statusSignal.set('SUCCESS');
    } catch (error) {
      console.error('[Inquiry Submission Error]', error);
      this.statusSignal.set('ERROR');
      throw error;
    }
  }

  /**
   * Submits inquiry securely using the local serverless endpoint proxy.
   */
  private async sendWithWeb3Forms(inquiry: ContactInquiry): Promise<void> {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(inquiry),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || `API error: ${response.status}`);
    }

    if (!result.success) {
      throw new Error(result.message || 'API submission failed');
    }
  }

  /**
   * Submits inquiry using FormSubmit AJAX endpoint.
   */
  private async sendWithFormSubmit(inquiry: ContactInquiry): Promise<void> {
    const url = `${environment.formSubmit.endpoint}${environment.formSubmit.email}`;
    const payload = {
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company || 'N/A',
      phone: inquiry.phone || 'N/A',
      project_type: inquiry.projectType,
      budget: inquiry.budget || 'N/A',
      timeline: inquiry.timeline || 'N/A',
      message: inquiry.message,
      _subject: `New Project Inquiry from ${inquiry.name}`,
      _honey: '', // Honeypot field for spam prevention
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`FormSubmit HTTP error: ${response.status}`);
    }

    const result = await response.json();
    if (result.success === 'false' || result.success === false) {
      throw new Error(result.message || 'FormSubmit API submission failed');
    }
  }

  /**
   * Submits inquiry using EmailJS REST API.
   */
  private async sendWithEmailJS(inquiry: ContactInquiry): Promise<void> {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const payload = {
      service_id: environment.emailJs.serviceId,
      template_id: environment.emailJs.templateId,
      user_id: environment.emailJs.publicKey,
      template_params: {
        subject: `New Project Inquiry from ${inquiry.name}`,
        from_name: inquiry.name,
        from_email: inquiry.email,
        company: inquiry.company || 'N/A',
        phone: inquiry.phone || 'N/A',
        project_type: inquiry.projectType,
        budget: inquiry.budget || 'N/A',
        timeline: inquiry.timeline || 'N/A',
        message: inquiry.message,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS API error: ${response.status} - ${errorText}`);
    }
  }

  /**
   * Resets the submission status back to IDLE.
   */
  resetStatus(): void {
    this.statusSignal.set('IDLE');
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcessComponent } from '../../components/process/process.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { TeamComponent } from '../../components/team/team.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { SeoService } from '../../core/services/seo.service';
import { FounderData } from '../../components/founder-card/founder-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ProcessComponent,
    WhyChooseUsComponent,
    TeamComponent,
    ContactFormComponent,
  ],
  template: `
    <main class="min-h-screen">
      <!-- Hero Section -->
      <app-hero
        (onConsult)="scrollToContact()"
        (onExplore)="scrollToSection('services')"
      />

      <!-- About Section -->
      <app-about />

      <!-- Services Section -->
      <app-services />

      <!-- Process Section -->
      <app-process />

      <!-- Why Choose Us Section -->
      <app-why-choose-us />

      <!-- Team Section -->
      <app-team (onScheduleCall)="handleScheduleCall($event)" />

      <!-- Contact Form Wrapper -->
      <div class="bg-white pb-20 sm:pb-28">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-contact-form />
        </div>
      </div>
    </main>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    // Set dynamic SEO tags for the agency landing page
    this.seoService.updateTitle('Custom Software Solutions');
    this.seoService.updateDescription(
      'We build modern websites, scalable web applications, secure backend systems, APIs, automation solutions, and AI-powered software tailored to your business requirements.'
    );
    this.seoService.updateOgUrl('https://corecraft.dev/');
  }

  scrollToContact(): void {
    this.scrollToSection('contact');
  }

  scrollToSection(anchor: string): void {
    const el = document.getElementById(anchor);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  handleScheduleCall(founder: FounderData): void {
    this.scrollToContact();
    
    // Auto-focus and pre-fill details for the founder schedule
    setTimeout(() => {
      const messageField = document.getElementById('message') as HTMLTextAreaElement;
      if (messageField) {
        messageField.focus();
        messageField.value = `Hi ${founder.name.split(' ')?.[0] || 'there'}, I would like to schedule a call with you to discuss our project requirements...`;
        
        // Dispatch standard input event so Angular Reactive Form catches the change
        messageField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 400); // Small delay to let smooth scroll navigate down first
  }
}

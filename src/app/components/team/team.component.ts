import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FounderCardComponent, FounderData } from '../founder-card/founder-card.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FounderCardComponent],
  template: `
    <section id="contact" class="bg-white border-t border-border-base py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">Meet Our Team</h2>
          <p class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
            Work Directly With the Engineers
          </p>
          <p class="mt-4 text-base sm:text-lg text-paragraph">
            Choose the team member you would like to connect with, or send us a message using the contact form below. Both of our founders discuss technical solutions and manage projects directly with you.
          </p>
        </div>

        <!-- Founders Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          @for (founder of founders; track founder.id) {
            <app-founder-card
              [data]="founder"
              (onSchedule)="handleSchedule($event)"
            />
          }
        </div>

      </div>
    </section>
  `,
})
export class TeamComponent {
  onScheduleCall = output<FounderData>();

  founders: FounderData[] = [
    {
      id: 'founder1',
      name: 'Alex Mercer',
      role: 'Founder | Software Engineer',
      initials: 'AM',
      introduction:
        'I work directly with clients to understand requirements, design scalable solutions, and build high-quality software that solves real business problems.',
      expertise: [
        'Custom Websites',
        'Backend Development',
        'REST APIs',
        'AI Integration',
        'Cloud Deployment',
        'Technical Consultation',
      ],
      email: 'alex.mercer@corecraft.dev',
      phone: '+1 (555) 0142',
      linkedin: 'https://linkedin.com/in/alex-mercer-placeholder',
      github: 'https://github.com/alex-mercer-placeholder',
    },
    {
      id: 'founder2',
      name: 'Sarah Chen',
      role: 'Co-Founder | Software Engineer',
      initials: 'SC',
      introduction:
        'I collaborate with clients throughout the software development lifecycle, helping transform ideas into reliable, scalable, and maintainable digital products.',
      expertise: [
        'Full Stack Development',
        'Web Applications',
        'Solution Design',
        'Client Consultation',
        'Project Planning',
        'Software Delivery',
      ],
      email: 'sarah.chen@corecraft.dev',
      phone: '+1 (555) 0187',
      linkedin: 'https://linkedin.com/in/sarah-chen-placeholder',
      github: 'https://github.com/sarah-chen-placeholder',
    },
  ];

  handleSchedule(founder: FounderData): void {
    this.onScheduleCall.emit(founder);
  }
}

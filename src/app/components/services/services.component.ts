import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

interface ServiceItem {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="services" class="bg-bg-base py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Expertise</h2>
          <p class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
            Custom Software Solutions Engineered for Performance
          </p>
          <p class="mt-4 text-base sm:text-lg text-paragraph">
            We provide specialized engineering capabilities to design, build, and support reliable software systems aligned with your business goals.
          </p>
        </div>

        <!-- Services Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          @for (item of services; track item.title) {
            <div class="bg-bg-card border border-border-base rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col justify-between group">
              <div>
                <!-- Icon container -->
                <div class="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <app-icon [name]="item.icon" [size]="24" [strokeWidth]="1.8" />
                </div>
                <!-- Card Title -->
                <h3 class="text-lg font-bold text-heading mb-3 group-hover:text-primary transition-colors duration-200">
                  {{ item.title }}
                </h3>
                <!-- Card Description -->
                <p class="text-sm leading-relaxed text-paragraph">
                  {{ item.description }}
                </p>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      icon: 'code',
      title: 'Custom Website Development',
      description: 'High-performance, search-optimized marketing and corporate websites built to convert visitors into clients.',
    },
    {
      icon: 'app',
      title: 'Web Application Development',
      description: 'Scalable, responsive, and secure frontend software architectures designed for complex web applications.',
    },
    {
      icon: 'database',
      title: 'Backend Development',
      description: 'Robust server-side logic, structured schemas, database design, and performance tuning for critical services.',
    },
    {
      icon: 'api',
      title: 'REST API Development',
      description: 'Secure, RESTful, and fully documented APIs designed to integrate smoothly with third-party software layers.',
    },
    {
      icon: 'cpu',
      title: 'AI & LLM Integration',
      description: 'Integrate advanced language models and artificial intelligence workflows into your existing product pipelines.',
    },
    {
      icon: 'automation',
      title: 'Business Automation',
      description: 'Automate repetitive workflows, connect systems, and eliminate manual data entry overhead.',
    },
    {
      icon: 'maintenance',
      title: 'Website Maintenance',
      description: 'Proactive support, performance checks, dependency updates, and security scanning to maintain software health.',
    },
    {
      icon: 'consulting',
      title: 'Technical Consulting',
      description: 'Direct architectural guidance, feasibility assessments, system design, and technology stack review.',
    },
  ];
}

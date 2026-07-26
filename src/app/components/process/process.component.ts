import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

interface ProcessStep {
  step: string;
  title: string;
  icon: IconName;
  description: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="process" class="bg-white border-y border-border-base py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Workflow</h2>
          <p class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
            How We Build Reliable Software
          </p>
          <p class="mt-4 text-base sm:text-lg text-paragraph">
            We follow a structured engineering process designed to maintain clarity, velocity, and quality from kick-off to delivery.
          </p>
        </div>

        <!-- Horizontal Timeline Grid (Desktop) / Vertical List (Mobile) -->
        <div class="relative">
          <!-- Desktop horizontal line connection -->
          <div class="hidden lg:block absolute top-[44px] left-1/8 right-1/8 h-0.5 bg-border-base -z-10"></div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            @for (step of steps; track step.step) {
              <div class="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 relative group">
                <!-- Step Circle Number & Icon -->
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-sm shadow-sm ring-4 ring-primary/10">
                    {{ step.step }}
                  </div>
                  <div class="w-12 h-12 rounded-lg bg-bg-base border border-border-base flex items-center justify-center text-heading group-hover:text-primary transition-colors duration-200">
                    <app-icon [name]="step.icon" [size]="20" [strokeWidth]="1.8" />
                  </div>
                </div>

                <!-- Text content -->
                <div class="pt-2">
                  <h3 class="text-lg font-bold text-heading mb-2">
                    {{ step.title }}
                  </h3>
                  <p class="text-sm leading-relaxed text-paragraph max-w-xs mx-auto lg:mx-0">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
})
export class ProcessComponent {
  steps: ProcessStep[] = [
    {
      step: '1',
      title: 'Requirement Discussion',
      icon: 'consulting',
      description: 'We meet directly with you to outline project goals, verify core technical constraints, and define actionable deliverables.',
    },
    {
      step: '2',
      title: 'Planning & Architecture',
      icon: 'api',
      description: 'We design complete database models, API schemas, user journeys, and component architectures before typing code.',
    },
    {
      step: '3',
      title: 'Development & Testing',
      icon: 'code',
      description: 'We write strict, type-safe code while maintaining automated integration test coverages for stable build deploys.',
    },
    {
      step: '4',
      title: 'Deployment & Support',
      icon: 'maintenance',
      description: 'We transition projects to production with zero-downtime setups and supply ongoing performance monitoring updates.',
    },
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface ChoiceCard {
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="why-choose-us" class="bg-bg-base py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Standards</h2>
          <p class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
            Why Businesses Partner With Us
          </p>
          <p class="mt-4 text-base sm:text-lg text-paragraph">
            We are more than just contractors. We act as engineering partners, focused on clean architecture and product excellence.
          </p>
        </div>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          @for (benefit of benefits; track benefit.title) {
            <div class="bg-bg-card border border-border-base rounded-xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-200 space-y-4">
              <!-- Checkmark icon wrapper -->
              <div class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <app-icon name="check" [size]="16" [strokeWidth]="3" />
              </div>
              
              <!-- Content -->
              <h3 class="text-lg font-bold text-heading">
                {{ benefit.title }}
              </h3>
              <p class="text-sm leading-relaxed text-paragraph">
                {{ benefit.description }}
              </p>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class WhyChooseUsComponent {
  benefits: ChoiceCard[] = [
    {
      title: 'Modern Technologies',
      description: 'We develop using contemporary and stable stacks like Angular, TypeScript, and modern styling solutions for optimal client code performance.',
    },
    {
      title: 'Clean Architecture',
      description: 'We modularize design frameworks to enable clean boundaries, high code testability, and painless codebase scaling.',
    },
    {
      title: 'Fast Delivery',
      description: 'We structure work into regular sprint reviews and active communication updates, ensuring target launch timelines are met.',
    },
    {
      title: 'Long-Term Support',
      description: 'We support our applications long after deploy, offering performance tuning, dependency upgrades, and modular expansion support.',
    },
  ];
}

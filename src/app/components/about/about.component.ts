import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="bg-bg-card border-y border-border-base py-20 sm:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          <!-- Column 1: Header / Hook -->
          <div class="lg:col-span-4">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">About Our Company</h2>
            <p class="text-3xl font-extrabold text-heading tracking-tight leading-tight font-sans">
              Engineering digital products with absolute integrity.
            </p>
          </div>

          <!-- Column 2: Content Narrative -->
          <div class="lg:col-span-8 space-y-6 text-base sm:text-lg text-paragraph leading-relaxed">
            <p>
              We are a team of passionate software engineers helping businesses build reliable digital products.
            </p>
            <p>
              From understanding your business requirements to delivering scalable software solutions, we work closely with every client throughout the development process.
            </p>
            <p class="font-semibold text-heading">
              Our focus is quality, transparency, clean engineering, and long-term partnerships.
            </p>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {}

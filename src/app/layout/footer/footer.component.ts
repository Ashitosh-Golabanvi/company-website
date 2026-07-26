import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <footer class="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Logo and Short Description -->
        <div class="space-y-6">
          <a
            href="#home"
            class="flex items-center gap-2.5 text-white font-bold text-xl group"
            (click)="scrollToSection('home', $event)"
          >
            <app-icon name="logo" class="text-primary group-hover:scale-105 transition-transform duration-200" [size]="28" />
            <span class="tracking-tight">Core<span class="text-primary">Craft</span></span>
          </a>
          <p class="text-sm leading-relaxed max-w-sm">
            We engineer high-performance custom websites, scalable web applications, secure backend systems, and automated software integrations designed for long-term growth.
          </p>
          <!-- Social Icons -->
          <div class="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <app-icon name="linkedin" [size]="20" />
            </a>
            <a
              href="https://github.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <app-icon name="github" [size]="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold text-sm tracking-wider uppercase mb-6">Quick Links</h3>
          <ul class="space-y-4 text-sm">
            @for (item of quickLinks; track item.anchor) {
              <li>
                <a
                  [href]="'#' + item.anchor"
                  class="hover:text-white transition-colors transition-all duration-200"
                  (click)="scrollToSection(item.anchor, $event)"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold text-sm tracking-wider uppercase mb-6">Services</h3>
          <ul class="space-y-4 text-sm">
            @for (service of services; track service) {
              <li>
                <a
                  href="#services"
                  class="hover:text-white transition-colors transition-all duration-200"
                  (click)="scrollToSection('services', $event)"
                >
                  {{ service }}
                </a>
              </li>
            }
          </ul>
        </div>

        <!-- Contact Information -->
        <div>
          <h3 class="text-white font-semibold text-sm tracking-wider uppercase mb-6">Contact</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <app-icon name="mail" [size]="18" class="shrink-0 mt-0.5 text-primary" />
              <a href="mailto:hello@corecraft.dev" class="hover:text-white transition-colors break-all">
                hello@corecraft.dev
              </a>
            </li>
            <li class="flex items-start gap-3">
              <app-icon name="phone" [size]="18" class="shrink-0 mt-0.5 text-primary" />
              <a href="tel:+15550199" class="hover:text-white transition-colors">
                +1 (555) 0199
              </a>
            </li>
            <li class="flex items-start gap-3">
              <app-icon name="calendar" [size]="18" class="shrink-0 mt-0.5 text-primary" />
              <a
                href="#contact"
                class="hover:text-white transition-colors"
                (click)="scrollToSection('contact', $event)"
              >
                Schedule a Call
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {{ currentYear }} CoreCraft. All rights reserved.</p>
        <p class="text-slate-500 tracking-wider">Premium Custom Software Engineering</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private readonly router = inject(Router);

  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', anchor: 'home' },
    { label: 'About', anchor: 'about' },
    { label: 'Services', anchor: 'services' },
    { label: 'Process', anchor: 'process' },
    { label: 'Contact', anchor: 'contact' },
  ];

  services = [
    'Custom Website Development',
    'Web Application Development',
    'Backend Development',
    'REST API Development',
    'AI & LLM Integration',
    'Business Automation',
    'Website Maintenance',
    'Technical Consulting',
  ];

  scrollToSection(anchor: string, event: Event): void {
    event.preventDefault();

    if (this.router.url !== '/' && this.router.url !== '/#') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scroll(anchor), 150);
      });
    } else {
      this.scroll(anchor);
    }
  }

  private scroll(anchor: string): void {
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
}

import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface NavItem {
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, ButtonComponent],
  template: `
    <header [class]="headerClasses()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <!-- Logo -->
        <a
          href="#home"
          class="flex items-center gap-2.5 text-heading font-bold text-xl group transition-colors duration-200"
          (click)="scrollToSection('home', $event)"
        >
          <app-icon
            name="logo"
            class="text-primary group-hover:scale-105 transition-transform duration-200"
            [size]="28"
          />
          <span class="tracking-tight">Core<span class="text-primary">Craft</span></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.anchor) {
            <a
              [href]="'#' + item.anchor"
              [class]="navLinkClasses(item.anchor)"
              (click)="scrollToSection(item.anchor, $event)"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <app-button variant="primary" (onClick)="scrollToSection('contact', $event)">
            Book a Free Consultation
          </app-button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button
          class="md:hidden p-2 -mr-2 text-paragraph hover:text-heading focus:outline-none transition-colors"
          (click)="toggleMobileMenu()"
          [attr.aria-label]="isMobileMenuOpen() ? 'Close Menu' : 'Open Menu'"
        >
          <app-icon [name]="isMobileMenuOpen() ? 'close' : 'menu'" [size]="24" />
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div [class]="mobileDrawerClasses()">
        <div class="px-4 pt-4 pb-8 space-y-4 border-t border-border-base bg-bg-card shadow-xl">
          @for (item of navItems; track item.anchor) {
            <a
              [href]="'#' + item.anchor"
              [class]="mobileNavLinkClasses(item.anchor)"
              (click)="scrollToSection(item.anchor, $event)"
            >
              {{ item.label }}
            </a>
          }
          <div class="pt-4">
            <app-button
              variant="primary"
              customClass="w-full"
              (onClick)="scrollToSection('contact', $event)"
            >
              Book a Free Consultation
            </app-button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private readonly router = inject(Router);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');

  navItems: NavItem[] = [
    { label: 'Home', anchor: 'home' },
    { label: 'About', anchor: 'about' },
    { label: 'Services', anchor: 'services' },
    { label: 'Process', anchor: 'process' },
    { label: 'Contact', anchor: 'contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Update scrolled state for navbar styles
    this.isScrolled.set(window.scrollY > 20);

    // Scroll Spy active segment detection
    const scrollPosition = window.scrollY + 120; // Accounts for header height + buffer
    for (const item of this.navItems) {
      const el = document.getElementById(item.anchor);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(item.anchor);
          break;
        }
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  scrollToSection(anchor: string, event: Event): void {
    event.preventDefault();
    this.isMobileMenuOpen.set(false);
    this.activeSection.set(anchor);

    // If route is not home, navigate home first, then scroll
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

  headerClasses(): string {
    return `sticky top-0 z-50 bg-bg-card/85 backdrop-blur-md transition-all duration-300 ${
      this.isScrolled() ? 'border-b border-border-base shadow-sm py-0' : 'border-b border-transparent py-1 sm:py-2'
    }`;
  }

  navLinkClasses(anchor: string): string {
    const base = 'text-sm font-medium transition-colors duration-200 relative py-1';
    const active = 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary';
    const inactive = 'text-paragraph hover:text-heading after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-250';
    return `${base} ${this.activeSection() === anchor ? active : inactive}`;
  }

  mobileDrawerClasses(): string {
    return `md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out border-b border-border-base ${
      this.isMobileMenuOpen()
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 -translate-y-4 pointer-events-none'
    }`;
  }

  mobileNavLinkClasses(anchor: string): string {
    const base = 'block py-2 text-base font-medium transition-colors duration-200';
    const active = 'text-primary border-l-2 border-primary pl-3';
    const inactive = 'text-paragraph hover:text-heading pl-3 border-l-2 border-transparent';
    return `${base} ${this.activeSection() === anchor ? active : inactive}`;
  }
}

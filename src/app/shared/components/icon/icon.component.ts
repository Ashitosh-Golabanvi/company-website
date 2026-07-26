import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
  | 'menu'
  | 'close'
  | 'check'
  | 'code'
  | 'app'
  | 'database'
  | 'api'
  | 'cpu'
  | 'automation'
  | 'maintenance'
  | 'consulting'
  | 'mail'
  | 'phone'
  | 'linkedin'
  | 'github'
  | 'calendar'
  | 'arrow-right'
  | 'logo';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [class]="class()"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="viewBox()"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Sleek Custom Agency Logo -->
      @if (name() === 'logo') {
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      }

      <!-- Menu / Hamburger -->
      @if (name() === 'menu') {
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      }

      <!-- Close / X -->
      @if (name() === 'close') {
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
      }

      <!-- Checkmark -->
      @if (name() === 'check') {
        <polyline points="20 6 9 17 4 12" />
      }

      <!-- Custom Website Development (Code) -->
      @if (name() === 'code') {
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" x2="10" y1="4" y2="20" />
      }

      <!-- Web Application Development (App/Monitor) -->
      @if (name() === 'app') {
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      }

      <!-- Backend Development (Database) -->
      @if (name() === 'database') {
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      }

      <!-- REST API Development (Connectivity/Server Link) -->
      @if (name() === 'api') {
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M21 9H3" />
        <path d="M21 15H3" />
        <path d="M12 3v18" />
      }

      <!-- AI & LLM Integration (CPU) -->
      @if (name() === 'cpu') {
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M9 1v3" />
        <path d="M15 1v3" />
        <path d="M9 20v3" />
        <path d="M15 20v3" />
        <path d="M20 9h3" />
        <path d="M20 15h3" />
        <path d="M1 9h3" />
        <path d="M1 15h3" />
      }

      <!-- Business Automation (Workflow/Gears) -->
      @if (name() === 'automation') {
        <path d="m8 2 8 8-8 8" />
        <path d="m12 18 8-8-8-8" />
      }

      <!-- Website Maintenance (Shield/Security Wrench) -->
      @if (name() === 'maintenance') {
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      }

      <!-- Technical Consulting (Message & Discussion) -->
      @if (name() === 'consulting') {
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      }

      <!-- Mail -->
      @if (name() === 'mail') {
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      }

      <!-- Phone -->
      @if (name() === 'phone') {
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        />
      }

      <!-- LinkedIn -->
      @if (name() === 'linkedin') {
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      }

      <!-- GitHub -->
      @if (name() === 'github') {
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      }

      <!-- Calendar -->
      @if (name() === 'calendar') {
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
      }

      <!-- Arrow Right -->
      @if (name() === 'arrow-right') {
        <line x1="5" x2="19" y1="12" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      }
    </svg>
  `,
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<number | string>(24);
  class = input<string>('');
  strokeWidth = input<number | string>(2);
  viewBox = input<string>('0 0 24 24');
}

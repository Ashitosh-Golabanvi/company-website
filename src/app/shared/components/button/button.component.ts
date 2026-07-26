import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="btnClasses()"
      (click)="onClick.emit($event)"
    >
      @if (loading()) {
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      }
      <span class="inline-flex items-center gap-2">
        <ng-content />
      </span>
    </button>
  `,
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  customClass = input<string>('');
  onClick = output<MouseEvent>();

  btnClasses(): string {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-pointer';
    
    let variantClass = '';
    switch (this.variant()) {
      case 'primary':
        variantClass = 'bg-primary hover:bg-primary-hover text-white shadow-sm focus:ring-primary/50';
        break;
      case 'secondary':
        variantClass = 'bg-heading hover:bg-slate-800 text-white shadow-sm focus:ring-slate-800/50';
        break;
      case 'outline':
        variantClass = 'bg-white hover:bg-slate-50 text-slate-700 border border-border-base focus:ring-slate-400/50';
        break;
    }

    return `${base} ${variantClass} ${this.customClass()}`;
  }
}

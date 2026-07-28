import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

export interface FounderData {
  id: string;
  name: string;
  role: string;
  initials: string;
  introduction: string;
  expertise: string[];
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

@Component({
  selector: 'app-founder-card',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  template: `
    <div class="bg-bg-card border border-border-base rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
      <div class="space-y-6">
        <!-- Circular Profile Image Placeholder with Gradient -->
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white font-extrabold flex items-center justify-center text-xl shadow-xs ring-4 ring-primary/5 select-none shrink-0">
            {{ data().initials }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-heading leading-tight">{{ data().name }}</h3>
            <p class="text-sm font-semibold text-primary mt-1">{{ data().role }}</p>
          </div>
        </div>

        <!-- Introduction -->
        <p class="text-sm leading-relaxed text-paragraph">
          {{ data().introduction }}
        </p>

        <!-- Expertise Tags -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-heading uppercase tracking-wider">Expertise</h4>
          <div class="flex flex-wrap gap-2">
            @for (exp of data().expertise; track exp) {
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-bg-base border border-border-base text-paragraph">
                {{ exp }}
              </span>
            }
          </div>
        </div>

        <!-- Direct Contact Details -->
        <div class="pt-4 border-t border-border-base space-y-3">
          <!-- Email -->
          <a
            [href]="'mailto:' + data().email"
            class="flex items-center gap-2.5 text-xs text-paragraph hover:text-primary transition-colors duration-150"
          >
            <app-icon name="mail" [size]="14" class="text-primary shrink-0" />
            <span class="truncate">{{ data().email }}</span>
          </a>
          <!-- Phone -->
          <a
            [href]="'tel:' + data().phone"
            class="flex items-center gap-2.5 text-xs text-paragraph hover:text-primary transition-colors duration-150"
          >
            <app-icon name="phone" [size]="14" class="text-primary shrink-0" />
            <span>{{ data().phone }}</span>
          </a>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="mt-8 pt-6 border-t border-border-base flex items-center justify-between gap-4">
        <!-- Social Profiles -->
        <div class="flex items-center gap-3">
          <a
            [href]="data().linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 rounded-md bg-bg-base border border-border-base flex items-center justify-center text-paragraph hover:text-primary hover:border-primary transition-all duration-200"
            [attr.aria-label]="data().name + ' LinkedIn'"
          >
            <app-icon name="linkedin" [size]="16" />
          </a>
          <a
            [href]="data().github"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 rounded-md bg-bg-base border border-border-base flex items-center justify-center text-paragraph hover:text-primary hover:border-primary transition-all duration-200"
            [attr.aria-label]="data().name + ' GitHub'"
          >
            <app-icon name="github" [size]="16" />
          </a>
        </div>

        <!-- Call schedule button -->
        <app-button variant="outline" customClass="px-4 py-2" (onClick)="onSchedule.emit(data())">
          <app-icon name="calendar" [size]="16" />
          Schedule Call
        </app-button>
      </div>
    </div>
  `,
})
export class FounderCardComponent {
  data = input.required<FounderData>();
  onSchedule = output<FounderData>();
}

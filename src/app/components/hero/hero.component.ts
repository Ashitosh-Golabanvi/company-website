import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <section id="home" class="relative overflow-hidden bg-bg-base pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      <!-- Minimal Radial Gradient Background Dot pattern -->
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:32px_32px] opacity-70"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Text Content (Left Column) -->
          <div class="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Engineering Partners For Your Growth
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight leading-[1.1] font-sans">
              Custom Software <br class="hidden sm:inline" />
              <span class="text-primary">Solutions</span> Built <br />
              Around Your Business
            </h1>

            <p class="text-base sm:text-lg lg:text-xl text-paragraph leading-relaxed max-w-xl mx-auto lg:mx-0">
              We build modern websites, scalable web applications, secure backend systems, APIs, automation solutions, and AI-powered software tailored to your business requirements.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <app-button variant="primary" (onClick)="onConsult.emit($event)">
                Book a Free Consultation
                <app-icon name="calendar" [size]="18" />
              </app-button>
              <app-button variant="outline" (onClick)="onExplore.emit($event)">
                Explore Services
                <app-icon name="arrow-right" [size]="18" class="group-hover:translate-x-1 transition-transform" />
              </app-button>
            </div>
          </div>

          <!-- Workspace / IDE Mockup (Right Column) -->
          <div class="lg:col-span-6 flex justify-center w-full max-w-xl mx-auto lg:max-w-none">
            <div class="relative w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-xs text-slate-300">
              <!-- Window top header -->
              <div class="bg-slate-950/80 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#EF4444] opacity-80"></span>
                  <span class="w-3 h-3 rounded-full bg-[#F59E0B] opacity-80"></span>
                  <span class="w-3 h-3 rounded-full bg-[#10B981] opacity-80"></span>
                </div>
                <div class="text-[11px] text-slate-500 font-medium">src/app/core/engine.ts</div>
                <div class="w-12"></div>
              </div>

              <!-- IDE editor lines -->
              <div class="p-6 space-y-2 overflow-x-auto text-[11px] sm:text-xs">
                <div>
                  <span class="text-pink-500">import</span> &#123; <span class="text-blue-400">Injectable</span>, <span class="text-blue-400">signal</span> &#125; <span class="text-pink-500">from</span> <span class="text-green-400">'&#64;angular/core'</span>;
                </div>
                <div>
                  <span class="text-pink-500">import</span> &#123; <span class="text-blue-400">Builder</span> &#125; <span class="text-pink-500">from</span> <span class="text-green-400">'./agency'</span>;
                </div>
                <div class="text-slate-600">// Professional customized software delivery</div>
                <div>
                  <span class="text-yellow-500">&#64;Injectable</span>(&#123; <span class="text-blue-400">providedIn</span>: <span class="text-green-400">'root'</span> &#125;)
                </div>
                <div>
                  <span class="text-pink-500">export class</span> <span class="text-yellow-400">ClientService</span> &#123;
                </div>
                <div class="pl-4">
                  <span class="text-blue-400">status</span> = <span class="text-yellow-500">signal</span>(<span class="text-green-400">'IDEAL_ARCHITECTURE'</span>);
                </div>
                <div class="pl-4">
                  <span class="text-blue-400">scalability</span> = <span class="text-yellow-500">signal</span>(<span class="text-pink-500">true</span>);
                </div>
                <div class="pl-4">
                  <span class="text-blue-400">security</span> = <span class="text-yellow-500">signal</span>(<span class="text-green-400">'MILITARY_GRADE'</span>);
                </div>
                <div class="pl-4 mt-2">
                  <span class="text-pink-500">async</span> <span class="text-yellow-400">buildFuture</span>(<span class="text-blue-400">project</span>: <span class="text-blue-300">Project</span>): <span class="text-yellow-500">Promise</span>&lt;<span class="text-blue-300">Solution</span>&gt; &#123;
                </div>
                <div class="pl-8">
                  <span class="text-pink-500">const</span> <span class="text-blue-400">architect</span> = <span class="text-pink-500">new</span> <span class="text-yellow-400">Builder</span>();
                </div>
                <div class="pl-8 text-pink-500">
                  return <span class="text-pink-500">await</span> <span class="text-blue-400">architect</span>.<span class="text-yellow-400">deploy</span>(&#123;
                </div>
                <div class="pl-12">
                  <span class="text-blue-400">cleanCode</span>: <span class="text-pink-500">true</span>,
                </div>
                <div class="pl-12">
                  <span class="text-blue-400">modernStack</span>: <span class="text-green-400">'Tailwind + Angular'</span>,
                </div>
                <div class="pl-12">
                  <span class="text-blue-400">optimizeSEO</span>: <span class="text-pink-500">true</span>,
                </div>
                <div class="pl-12">
                  <span class="text-blue-400">deliverAheadOfTime</span>: <span class="text-pink-500">true</span>
                </div>
                <div class="pl-8">
                  &#125;);
                </div>
                <div class="pl-4">&#125;</div>
                <div>&#125;</div>
              </div>

              <!-- Overlaid dashboard graph mock for premium feel -->
              <div class="absolute bottom-4 right-4 bg-slate-950/90 border border-slate-800 rounded-lg p-3 shadow-xl max-w-[200px] hidden sm:block">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">System Health</span>
                  <span class="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Active</span>
                </div>
                <div class="text-lg font-bold text-white tracking-tight">100.0% Uptime</div>
                <div class="flex items-end gap-1 h-8 mt-2">
                  <div class="w-2.5 bg-primary/20 h-4 rounded-xs"></div>
                  <div class="w-2.5 bg-primary/30 h-5 rounded-xs"></div>
                  <div class="w-2.5 bg-primary/40 h-6 rounded-xs"></div>
                  <div class="w-2.5 bg-primary/60 h-5 rounded-xs"></div>
                  <div class="w-2.5 bg-primary/80 h-7 rounded-xs"></div>
                  <div class="w-2.5 bg-primary h-8 rounded-xs"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  onConsult = output<MouseEvent>();
  onExplore = output<MouseEvent>();
}

import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  /**
   * Updates the browser title and related OG/Twitter titles.
   */
  updateTitle(title: string): void {
    const suffix = 'Premium Software Development Agency';
    const formattedTitle = title ? `${title} | ${suffix}` : suffix;
    this.titleService.setTitle(formattedTitle);
    this.metaService.updateTag({ property: 'og:title', content: formattedTitle });
    this.metaService.updateTag({ name: 'twitter:title', content: formattedTitle });
  }

  /**
   * Updates page description and related OG/Twitter descriptions.
   */
  updateDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  /**
   * Updates Open Graph and Twitter card image tags.
   */
  updateOgImage(imageUrl: string): void {
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  /**
   * Updates Open Graph URL tags.
   */
  updateOgUrl(url: string): void {
    this.metaService.updateTag({ property: 'og:url', content: url });
  }
}

import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-style-switcher',
  templateUrl: './style-switcher.component.html',
  styleUrls: ['./style-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleSwitcherComponent {
  Object = Object;
  cssLibraryOptions = {
    'tailwind': { key: 'tailwind' },
    'bootstrap': { key: 'bootstrap' }
  }
  cssLibrary: string = this.cssLibraryOptions.tailwind.key;


  constructor(@Inject(DOCUMENT) private document: Document) {
    if (localStorage) {
      const theme = localStorage.getItem('cssLib');
      if (theme) {
        for (const prop of Object.keys(this.cssLibraryOptions)) {
          if (prop === theme) {
            this.loadStyle(theme as string);
            return;
          }
        }
      }
    }
    this.loadStyle(this.cssLibrary);
  }


  onLibChanged(event: any) {
    this.loadStyle(event)
  }

  private loadStyle(styleName: string): void {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.querySelector('link[href$="-styles.css"]') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${styleName}-styles.css`;
    } else {
      const style = this.document.createElement('link');
      style.rel = 'stylesheet';
      style.href = `${styleName}-styles.css`;

      head.appendChild(style);
    }

    if (this.document.documentElement.classList && this.document.documentElement.classList.contains(this.cssLibrary)) {
      this.document.documentElement.classList.remove(this.cssLibrary);
    }
    this.cssLibrary = styleName;

    this.document.documentElement.classList.add(styleName);

    if (localStorage) {
      localStorage.setItem('cssLib', styleName);
    }
  }
}

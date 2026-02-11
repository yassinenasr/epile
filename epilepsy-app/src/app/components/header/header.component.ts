import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  currentLang: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar', 'tn']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.currentLang = browserLang && browserLang.match(/en|fr|ar|tn/) ? browserLang : 'en';
    translate.use(this.currentLang);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

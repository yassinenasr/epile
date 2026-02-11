import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css']
})
export class AdviceComponent {

  cards = [
    { key: 'CARD_1', icon: 'info', videoIds: ['f1-GzT6wSWw'] },
    { key: 'CARD_2', icon: 'category', videoIds: ['hAD91PgB73g', 'XZtHqADTbkk'] },
    { key: 'CARD_3', icon: 'child_care' },
    { key: 'CARD_4', icon: 'medical_services', videoIds: ['GbbvW5K0Zho'] },
    { key: 'CARD_5', icon: 'psychology' },
    { key: 'CARD_6', icon: 'medication', videoIds: ['zvSEfHvjUYk'] }
  ];

  selectedCard: any = null;
  isModalOpen = false;

  constructor(private sanitizer: DomSanitizer) {
    console.log('AdviceComponent initialized', this.cards);
  }

  openModal(card: any) {
    this.selectedCard = card;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCard = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}

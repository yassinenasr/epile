import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Message {
    text: string;
    isUser: boolean;
    options?: Option[];
}

interface Option {
    label: string;
    action: () => void;
}

interface Option {
    label: string;
    action: () => void;
}

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
    isOpen = false;
    messages: Message[] = [];
    currentLanguage: string | null = null;


    constructor(private router: Router, private translate: TranslateService) {
        // Subscribe to language changes to update the chat or keep formatting
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen && this.messages.length === 0) {
            this.startChat();
        }
    }

    startChat() {
        this.messages = [];
        this.currentLanguage = this.translate.currentLang as any;

        // Greeting
        this.messages.push({
            text: this.translate.instant('CHATBOT.GREETING'),
            isUser: false,
            options: this.getOptions()
        });
    }

    getOptions(): Option[] {
        return [
            { label: this.translate.instant('CHATBOT.OPTIONS.WHAT_IS.LABEL'), action: () => this.handleOption('WHAT_IS') },
            { label: this.translate.instant('CHATBOT.OPTIONS.QUIZ.LABEL'), action: () => this.handleOption('QUIZ') },
            { label: this.translate.instant('CHATBOT.OPTIONS.ADVICE.LABEL'), action: () => this.handleOption('ADVICE') }
        ];
    }

    handleOption(key: 'WHAT_IS' | 'QUIZ' | 'ADVICE') {
        // User message
        this.messages.push({
            text: this.translate.instant(`CHATBOT.OPTIONS.${key}.LABEL`),
            isUser: true
        });

        // Bot response
        setTimeout(() => {
            this.messages.push({
                text: this.translate.instant(`CHATBOT.OPTIONS.${key}.BRIEF`),
                isUser: false
            });

            // Follow up button
            setTimeout(() => {
                const routeInfo = this.getRouteInfo(key);
                this.messages.push({
                    text: this.translate.instant('CHATBOT.KNOW_MORE'),
                    isUser: false,
                    options: [{
                        label: this.translate.instant(`CHATBOT.OPTIONS.${key}.BUTTON`),
                        action: () => {
                            this.router.navigate([routeInfo.route], { fragment: routeInfo.fragment });
                            this.isOpen = false; // Close chat on navigation? Optional.
                        }
                    }]
                });
            }, 500);
        }, 500);
    }

    getRouteInfo(key: string): { route: string, fragment: string } {
        switch (key) {
            case 'WHAT_IS': return { route: '/advice', fragment: 'propos' };
            case 'QUIZ': return { route: '/quiz', fragment: '' };
            default: return { route: '/advice', fragment: '' };
        }
    }

    resetChat() {
        this.startChat();
    }
}

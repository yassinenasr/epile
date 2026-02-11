import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Message {
    text: string;
    isUser: boolean;
    options?: Option[];
}

interface Option {
    label: string;
    action: () => void;
}

interface ContentOption {
    label: string;
    route: string;
    fragment: string;
    briefAnswer: string;
    button: string;
}

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
    isOpen = false;
    currentLanguage: 'ar' | 'fr' | 'en' | 'tn' | null = null;
    messages: Message[] = [];

    // Content Dictionary
    content = {
        ar: {
            greeting: 'مرحباً بك! أنا مساعدك الذكي، هنا لأدعمك في رحلة فهم الصرع والإجابة على استفساراتك بكل ود.',
            options: [
                { label: 'ما هو الصرع؟', route: '/advice', fragment: 'propos', briefAnswer: 'الصرع هو حالة صحية مزمنة تؤثر على الجهاز العصبي المركزي، وتتسم بتكرار نوبات مفاجئة نتيجة لاضطراب مؤقت في الإشارات الكهربائية في الدماغ. هو ليس مرضاً معدياً ولا عقلياً.', button: 'قراءة المزيد من التفاصيل' },
                { label: 'اختبر معلوماتك', route: '/quiz', fragment: '', briefAnswer: 'نقدم لك اختباراً تفاعلياً ممتعاً لتقييم مدى معرفتك بالصرع وكيفية التعامل معه. هل تود خوض التحدي؟', button: 'بدء الاختبار الآن' },
                { label: 'نصائح وإرشادات', route: '/advice', fragment: '', briefAnswer: 'للسيطرة على الصرع، ننصح بـ: الحفاظ على جدول نوم منتظم، تناول الأدوية في مواعيدها بدقة، تجنب مسببات التوتر، واتباع نظام غذائي متوازن.', button: 'تصفح كافة النصائح' }
            ],
            restart: 'العودة للقائمة الرئيسية'
        },
        fr: {
            greeting: 'Bonjour et bienvenue! Je suis votre assistant virtuel, ravi de vous aider à mieux comprendre l\'épilepsie et de répondre à vos questions.',
            options: [
                { label: 'Qu\'est-ce que l\'épilepsie?', route: '/advice', fragment: 'propos', briefAnswer: 'L\'épilepsie est une affection neurologique chronique qui se manifeste par des crises récurrentes dues à des décharges électriques excessives dans le cerveau. Ce n\'est ni une maladie mentale ni contagieuse.', button: 'Lire plus de détails' },
                { label: 'Testez vos connaissances', route: '/quiz', fragment: '', briefAnswer: 'Nous vous invitons à évaluer vos connaissances sur l\'épilepsie grâce à notre quiz interactif et éducatif. Souhaitez-vous essayer?', button: 'Commencer le Quiz' },
                { label: 'Conseils et astuces', route: '/advice', fragment: '', briefAnswer: 'Pour mieux vivre avec l\'épilepsie, il est recommandé de : maintenir un sommeil régulier, prendre ses médicaments à heure fixe, gérer son stress et éviter les facteurs déclenchants.', button: 'Voir tous les conseils' }
            ],
            restart: 'Retour au menu principal'
        },
        en: {
            greeting: 'Hello and welcome! I am your intelligent assistant, here to kindly support you in understanding epilepsy and answering your inquiries.',
            options: [
                { label: 'What is Epilepsy?', route: '/advice', fragment: 'propos', briefAnswer: 'Epilepsy is a chronic central nervous system disorder characterized by recurrent seizures caused by temporary abnormal electrical activity in the brain. It is neither a mental illness nor contagious.', button: 'Read More Details' },
                { label: 'Test your knowledge', route: '/quiz', fragment: '', briefAnswer: 'We invite you to assess your understanding of epilepsy through our interactive and educational quiz. Would you like to take the challenge?', button: 'Start the Quiz Now' },
                { label: 'Advice & Tips', route: '/advice', fragment: '', briefAnswer: 'To better manage epilepsy, we recommend: maintaining a regular sleep schedule, taking medications strictly on time, managing stress, and avoiding known seizure triggers.', button: 'View All Tips' }
            ],
            restart: 'Back to main menu'
        },
        tn: {
            greeting: 'عسلامة ومرحباً بيك! أنا المساعد الذكي، موجود هوني باش نعاونك تفهم الصرع ونجاوب على أسئلتك بكل فرح وسرور.',
            options: [
                { label: 'شنوة هو الصرع؟', route: '/advice', fragment: 'propos', briefAnswer: 'الصرع هو حالة صحية مزمنة تصيب المخ، وتخلي الواحد تجيه نوبات (crises) تتعاود بسبب شحنات كهربائية زايدة في الراس. راهو ما هواش مرض عقلي وما يعديش.', button: 'زيد شوف التفاصيل' },
                { label: 'جرب معلوماتك', route: '/quiz', fragment: '', briefAnswer: 'نحبوا نشوفو مدى معرفتك بالصرع من خلال كويز تفاعلي وتحفون برشا. تحب تجرب روحك؟', button: 'ابدأ الكويز توا' },
                { label: 'نصائح هامة', route: '/advice', fragment: '', briefAnswer: 'باش تتعايش مع الصرع بالباهي، ننصحك بـ: ارقد في وقت منظم، اشرب دواك في وقته بالظبط، ابعد عالستراس والمشاكل، وكول ماكلة صحية.', button: 'شوف النصائح الكل' }
            ],
            restart: 'رجوع للقائمة'
        }
    };

    constructor(private router: Router) { }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen && this.messages.length === 0) {
            this.resetChat();
        }
    }

    resetChat() {
        this.currentLanguage = null;
        this.messages = [{
            text: 'Please select your language / Choisir la langue / اختر اللغة',
            isUser: false,
            options: [
                { label: 'العربية (AR)', action: () => this.selectLanguage('ar') },
                { label: 'Français (FR)', action: () => this.selectLanguage('fr') },
                { label: 'English (EN)', action: () => this.selectLanguage('en') },
                { label: 'Tounsi (TN)', action: () => this.selectLanguage('tn') }
            ]
        }];
    }

    selectLanguage(lang: 'ar' | 'fr' | 'en' | 'tn') {
        this.currentLanguage = lang;
        const langContent = this.content[lang];

        // User message (visual only)
        this.messages.push({
            text: lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'تونسية',
            isUser: true
        });

        // Bot greeting and main options
        setTimeout(() => {
            this.messages.push({
                text: langContent.greeting,
                isUser: false,
                options: langContent.options.map(opt => ({
                    label: opt.label,
                    action: () => this.handleOption(opt)
                }))
            });
        }, 500);
    }

    handleOption(opt: ContentOption) {
        // 1. User selects option -> Show selection
        this.messages.push({
            text: opt.label,
            isUser: true
        });

        // 2. Bot responds with BRIEF ANSWER
        setTimeout(() => {
            this.messages.push({
                text: opt.briefAnswer,
                isUser: false
            });

            // 3. Bot responds with Navigation Option
            setTimeout(() => {
                this.messages.push({
                    text: this.currentLanguage === 'ar' || this.currentLanguage === 'tn' ? 'هل تريد معرفة المزيد؟' :
                        this.currentLanguage === 'fr' ? 'Voulez-vous en savoir plus?' : 'Would you like to know more?',
                    isUser: false,
                    options: [{
                        label: opt.button,
                        action: () => {
                            this.router.navigate([opt.route], { fragment: opt.fragment });
                        }
                    }]
                });
            }, 500);

        }, 500);
    }
}

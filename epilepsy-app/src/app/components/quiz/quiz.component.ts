import { Component, OnInit } from '@angular/core';
import { QuizService, Scenario } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentScenarioIndex = 0;
  selectedOptionId: string | null = null;
  score = 0;
  isGameOver = false;
  isAnswered = false;

  scenarios: Scenario[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuestions().subscribe(questions => {
      this.scenarios = questions;
    });
  }

  get currentScenario() {
    return this.scenarios[this.currentScenarioIndex];
  }

  get progress() {
    return this.scenarios.length ? ((this.currentScenarioIndex + 1) / this.scenarios.length) * 100 : 0;
  }

  selectOption(optionId: string) {
    if (this.isAnswered) return; // Prevent changing selection once answered
    this.selectedOptionId = optionId;
    this.isAnswered = true;

    // Calculate score immediately
    const selectedOption = this.currentScenario.options.find(o => o.id === this.selectedOptionId);
    if (selectedOption) {
      this.score += selectedOption.points;
    }
  }

  nextScenario() {
    if (this.currentScenarioIndex < this.scenarios.length - 1) {
      this.currentScenarioIndex++;
      this.selectedOptionId = null;
      this.isAnswered = false; // Reset for next question
    } else {
      this.isGameOver = true;
    }
  }

  get resultFeedback() {
    const percentage = (this.score / this.scenarios.length) * 100;

    if (percentage === 100) {
      return {
        emoji: '🏆',
        title: 'مذهل! علامة كاملة!',
        message: 'أنت خبير في التعامل مع الصرع. معلوماتك ممتازة وتساعد في إنقاذ الحياة.',
        colorClass: 'text-yellow-500'
      };
    } else if (percentage >= 80) {
      return {
        emoji: '🌟',
        title: 'عمل رائع!',
        message: 'لديك وعي كبير ومعلومات قوية. أحسنت!',
        colorClass: 'text-purple-500'
      };
    } else if (percentage >= 50) {
      return {
        emoji: '👍',
        title: 'جيد جداً',
        message: 'لديك معلومات أساسية جيدة، لكن يمكنك تعزيزها بالمزيد من القراءة.',
        colorClass: 'text-blue-500'
      };
    } else {
      return {
        emoji: '📚',
        title: 'تحتاج للمزيد من الاطلاع',
        message: 'لا بأس، الصرع موضوع مهم وننصحك بمراجعة قسم "نصيحة اليوم" لزيادة معلوماتك.',
        colorClass: 'text-slate-500'
      };
    }
  }

  restartQuiz() {
    this.currentScenarioIndex = 0;
    this.selectedOptionId = null;
    this.score = 0;
    this.isGameOver = false;
    this.isAnswered = false;
    // Optionally re-shuffle on restart
    this.quizService.getQuestions().subscribe(questions => {
      this.scenarios = questions;
    });
  }
}

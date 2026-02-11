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
        title: 'QUIZ.FEEDBACK.PERFECT_TITLE',
        message: 'QUIZ.FEEDBACK.PERFECT_MSG',
        colorClass: 'text-yellow-500'
      };
    } else if (percentage >= 80) {
      return {
        emoji: '🌟',
        title: 'QUIZ.FEEDBACK.GREAT_TITLE',
        message: 'QUIZ.FEEDBACK.GREAT_MSG',
        colorClass: 'text-purple-500'
      };
    } else if (percentage >= 50) {
      return {
        emoji: '👍',
        title: 'QUIZ.FEEDBACK.GOOD_TITLE',
        message: 'QUIZ.FEEDBACK.GOOD_MSG',
        colorClass: 'text-blue-500'
      };
    } else {
      return {
        emoji: '📚',
        title: 'QUIZ.FEEDBACK.NEEDS_WORK_TITLE',
        message: 'QUIZ.FEEDBACK.NEEDS_WORK_MSG',
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

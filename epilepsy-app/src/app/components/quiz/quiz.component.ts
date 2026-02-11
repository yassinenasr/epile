import { Component } from '@angular/core';

interface Question {
  id: number;
  text: string;
  options: { id: string, text: string, isCorrect: boolean }[];
  fact: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  currentQuestionIndex = 0;
  selectedOptionId: string | null = null;
  score = 0;

  questions: Question[] = [
    {
      id: 1,
      text: "Qu'est-ce que l'épilepsie ?",
      options: [
        { id: 'A', text: "Une maladie mentale contagieuse.", isCorrect: false },
        { id: 'B', text: "Une affection neurologique chronique.", isCorrect: true },
        { id: 'C', text: "Une forme de somnambulisme.", isCorrect: false },
        { id: 'D', text: "Un virus saisonnier.", isCorrect: false }
      ],
      fact: "L'épilepsie n'est pas une maladie mentale. C'est un trouble neurologique qui peut toucher tout le monde."
    },
    {
      id: 2,
      text: "Quel est le signe le plus fréquent ?",
      options: [
        { id: 'A', text: "Avoir très soif.", isCorrect: false },
        { id: 'B', text: "Des crises convulsives répétées.", isCorrect: true },
        { id: 'C', text: "Une toux persistante.", isCorrect: false },
        { id: 'D', text: "Des rougeurs sur la peau.", isCorrect: false }
      ],
      fact: "Les crises peuvent prendre plusieurs formes : convulsions, absences, ou sensations étranges."
    },
    {
      id: 3,
      text: "Quels sont les premiers secours lors d'une crise tonico-clonique ?",
      options: [
        { id: 'A', text: "Mettre un objet dans la bouche pour éviter de se mordre la langue.", isCorrect: false },
        { id: 'B', text: "Protéger la tête, noter l'heure et mettre la personne en PLS après la crise.", isCorrect: true },
        { id: 'C', text: "Maintenir fermement la personne pour arrêter les secousses.", isCorrect: false },
        { id: 'D', text: "Lui donner un verre d'eau immédiatement pendant la crise.", isCorrect: false }
      ],
      fact: "Il ne faut jamais rien mettre dans la bouche d'une personne en crise. C'est un mythe dangereux."
    }
  ];

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get progress() {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  selectOption(optionId: string) {
    this.selectedOptionId = optionId;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOptionId = null;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOptionId = null; // Or restore previous selection if tracked
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
    points: number;
}

export interface Scenario {
    id: number;
    situation: string;
    options: Option[];
}

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private dataUrl = 'assets/data/quiz-questions.json';

    constructor(private http: HttpClient) { }

    getQuestions(): Observable<Scenario[]> {
        return this.http.get<Scenario[]>(this.dataUrl).pipe(
            map(questions => this.shuffleArray(questions))
        );
    }

    private shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

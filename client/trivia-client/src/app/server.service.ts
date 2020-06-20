import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions, ClientQuestion } from './questions';
import { UserScore } from './leaderboard/UserScore';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  correctAnswers: Array<string>;
  leaderboard: Array<UserScore> = [];

  constructor(private http: HttpClient) {}
  async getQuestions() {
    let questions = await this.http
      .get<Questions>('https://opentdb.com/api.php?amount=2')
      .toPromise()
      .then((res) => {
        return res.results;
      });
    this.correctAnswers = questions.map((q) => q.correct_answer);
    let clientQuestions: Array<ClientQuestion> = [];
    questions.forEach((question) => {
      let choices = Array.from(question.incorrect_answers);
      choices.push(question.correct_answer);
      shuffle(choices);
      clientQuestions.push({
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        type: question.type,
        choices: choices,
      });
    });
    return clientQuestions;
  }
  getLeaderboard(): Array<UserScore> {
    return this.leaderboard;
  }
  getScore(answers: Array<string>): number {
    let score = 0;
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.correctAnswers[i] === answers[i]) {
        score++;
      }
    }
    return score;
  }
  addScore(username: string, score: number) {
    this.leaderboard.push({
      score: score,
      username: username,
    });
  }
}

//  Fisher-Yates Shuffle Algorithm from https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

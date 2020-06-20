import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Question } from '../questions';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  questions: Array<Question>;
  answers: Array<string> = [];
  loading = true;

  submitted = false;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      ageRangeValidator,
    ]),
  });

  constructor(private server: ServerService) {}

  async ngOnInit() {
    this.questions = await this.server.getQuestions();
    this.loading = false;
  }
  submit(form: NgForm) {
    for (const question in form.value) {
      console.log(question + ': ' + form.value[question]);
    }
    console.log(form.value);
    this.submitted = true;
    console.log('answers = ' + this.answers);
    // console.log('answer');
  }
  submitUsername() {}
  // getGuessed() {
  //   return this.game.guesses.split('').sort();
  // }

  // getNotGuessed() {
  //   const guesses = this.game.guesses.split('');
  //   return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  //     .split('')
  //     .filter((c) => !guesses.includes(c));
  // }

  // async guess(c: string) {
  //   this.loading = true;
  //   this.game = await this.server.guessGame(c);
  //   this.loading = false;
  // }

  // async newGame() {
  //   this.loading = true;
  //   this.game = await this.server.getGame();
  //   this.loading = false;
  // }
}

function ageRangeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value.indexOf(' ') >= 0) {
    return { whiteSpace: true };
  }
  return null;
}

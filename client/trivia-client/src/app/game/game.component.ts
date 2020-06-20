import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ClientQuestion } from '../questions';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  questions: Array<ClientQuestion>;
  answers: Array<string> = [];
  score: number;
  loading = true;

  submitted = false;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      ageRangeValidator,
    ]),
  });

  constructor(private server: ServerService, private router: Router) {}

  async ngOnInit() {
    this.questions = await this.server.getQuestions();
    this.loading = false;
  }
  submit(form: NgForm) {
    this.score = this.server.getScore(this.answers);
    this.submitted = true;
  }
  submitUsername() {
    this.server.addScore(this.form.controls['name'].value, this.score);
    this.router.navigateByUrl('/leaderboard');
  }
}

function ageRangeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value.indexOf(' ') >= 0) {
    return { whiteSpace: true };
  }
  return null;
}

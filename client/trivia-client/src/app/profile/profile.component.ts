import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';

interface Profile {
  email: string;
  username: string;
  score: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  loading = true;
  profile?: Profile;

  constructor(private fb: FormBuilder, private server: ServerService) {}

  async ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
    });

    // try {
    //   this.profile = await this.server.getProfile();
    // } catch (err) {}
    this.loading = false;
  }

  async onSubmitUsername() {
    // await this.server.updateUser(this.form.get('username').value);
    // this.profile = await this.server.getProfile();
  }
}

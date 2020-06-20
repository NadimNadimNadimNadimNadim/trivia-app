import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { UserScore } from './UserScore';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: UserScore[];
  loading = true;

  constructor(private server: ServerService) {}

  ngOnInit() {
    this.leaderboard = this.server.getLeaderboard();
    this.loading = false;
  }
}

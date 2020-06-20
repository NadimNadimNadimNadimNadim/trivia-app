import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

interface UserScore {
  username: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: UserScore[];
  loading = true;

  constructor(private server: ServerService) {}

  async ngOnInit() {
    // this.leaderboard = await this.server.getLeaderboard();
    this.loading = false;
  }
}

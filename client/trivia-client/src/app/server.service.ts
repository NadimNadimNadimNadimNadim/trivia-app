import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}
  getGame() {
    this.http
      .get<Questions>('https://opentdb.com/api.php?amount=10')
      .subscribe((response) => {
        return response.results;
      });
  }
}

// private async request(method: string, url: string, data?: any) {

//   const result = this.http.request(method, url, {
//     body: data,
//     responseType: 'json',
//     observe: 'body',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return new Promise<any>((resolve, reject) => {
//     result.subscribe(resolve, reject);
//   });
// }

//   getGame() {
//     // update environment.ts with actual server
//     return this.http('GET', `${environment.server}/game`);
//   }

//   guessGame(guess: string) {
//     return this.http('PUT', `${environment.server}/game`, { guess });
//   }

//   getProfile() {
//     return this.http('GET', `${environment.server}/profile`);
//   }

//   updateUser(username) {
//     return this.http('PUT', `${environment.server}/profile`, {
//       username,
//     });
//   }

//   getLeaderboard() {
//     return this.http('GET', `${environment.server}/leaderboard`);
//   }
// }

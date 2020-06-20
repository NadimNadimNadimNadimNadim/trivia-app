import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}
  async getQuestions() {
    return await this.http
      .get<Questions>('https://opentdb.com/api.php?amount=2')
      .toPromise()
      .then((res) => {
        return res.results;
      });
  }
}

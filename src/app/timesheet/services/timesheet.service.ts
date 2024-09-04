import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILog } from '../interfaces/log.interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  BASE_URL = 'https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  saveLog(log: ILog) {
    return this.http.post(`${this.BASE_URL}/log`, log);
  }

  getLogs() {
    return this.http.get(`${this.BASE_URL}/log`);
  }

  getTask(name: string): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.BASE_URL}/task?name=${name}`)
  }
}

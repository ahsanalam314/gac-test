import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILog } from '../interfaces/log.interface'
import { Observable } from 'rxjs';
import { ITaskTypeahed } from '../interfaces/task-typeahead.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  BASE_URL = 'https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  saveLog(log: ILog): Observable<ITask> {
    return this.http.post<ITask>(`${this.BASE_URL}/log`, log);
  }

  /**
   * getting logs on behalf of the task Name because of the conflicts in the id
   * mutiple tasks have same id
   * @param task
   */
  getLogs(task?: string): Observable<ITask[]> {
    let url = task ? `log?task=${task}` : 'log';
    return this.http.get<ITask[]>(`${this.BASE_URL}/${url}`);
  }

  getTasks(name?: string): Observable<ITaskTypeahed[]> {
    let url = name ? `task?name=${name}` : 'task';
    return this.http.get<ITaskTypeahed[]>(`${this.BASE_URL}/${url}`)
  }
}

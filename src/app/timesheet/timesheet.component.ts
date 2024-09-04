import { Component, OnInit } from '@angular/core';
import { TimesheetService } from './services/timesheet.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, forkJoin, Observable, of, OperatorFunction, startWith, switchMap } from 'rxjs';
import { ITask } from './interfaces/task.interface';
import { ITaskTypeahed } from './interfaces/task-typeahead.interface';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  form!: FormGroup;
  headers = ['Task', 'Start', 'End'];
  tasks: ITaskTypeahed[] = [];
  logs: ITask[] = [];
  filter: string = '';

  constructor(private timesheetService: TimesheetService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTasks();
    this.getLogs();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    })
  }

  get controls() {
    return this.form.controls;
  }

  saveTask(): void {
    if (this.form.invalid) {
      return;
    }

    this.timesheetService.saveLog(this.form.value).subscribe({
      next: (response: ITask) => {
        this.form.reset();
        this.getLogs();
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

  formatter = (task: ITaskTypeahed) => task?.name;

  searchTask: OperatorFunction<string, readonly ITaskTypeahed[]> = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.timesheetService.getTasks(value)),
      catchError(error => of([]))
    );
  }

  getLogs(): void {
    this.timesheetService.getLogs(this.filter).subscribe({
      next: (response: ITask[]) => {
        this.logs = response ?? [];
      },
      error: (error) => {
        console.error(error);
        this.logs = [];
      }
    });
  }

  getTasks(): void {
    this.timesheetService.getTasks().subscribe({
      next: (response: ITaskTypeahed[] ) => {
        this.tasks = response ?? []
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  clear(): void {
    this.filter = '';
    this.getLogs();
  }

  onItemSelect(event: NgbTypeaheadSelectItemEvent): void {
    const task =  event.item as ITaskTypeahed;
    this.controls['task'].setValue(task.name);
  }

}

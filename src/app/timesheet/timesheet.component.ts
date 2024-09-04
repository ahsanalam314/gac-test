import { Component, OnInit } from '@angular/core';
import { TimesheetService } from './services/timesheet.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Observable, OperatorFunction, startWith, switchMap, throttleTime } from 'rxjs';
import { ITask } from './interfaces/task.interface';
import { ITaskTypeahed } from './interfaces/task-typeahead.interface';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  form!: FormGroup;
  headers = ['Task', 'Start', 'End'];
  tasks = [];
  logs:ITask[] = [];

  constructor(private timesheetService: TimesheetService, private formBuilder: FormBuilder) {
    this.createForm();

  }

  ngOnInit(): void {
    this.getLogs();
  }

  createForm() {
    this.form = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    })
  }

  get controls() {
    return this.form.controls;
  }

  saveTask() {
    if (this.form.invalid) {
      return;
    }

    this.timesheetService.saveLog(this.form.value).subscribe(response => {
      console.log('save: ', response);
      this.form.reset();
      this.getLogs();
    }, error => {

    })

  }

  formatter = (task: ITaskTypeahed) => task?.name;

  searchTask: OperatorFunction<string, readonly Object[]> = (text$: Observable<string>) => {
    return text$.pipe(
      throttleTime(500),
      distinctUntilChanged(),
      switchMap(value => this.timesheetService.getTask(value))
    );
  }

  getLogs() {
    this.timesheetService.getLogs().subscribe((response: any) => {
      this.logs = response;
    }, (error) => {

    })
  }


}

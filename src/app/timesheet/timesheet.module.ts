import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const route: Routes = [
  {
    path: '',
    component: TimesheetComponent
  }
]


@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class TimesheetModule { }

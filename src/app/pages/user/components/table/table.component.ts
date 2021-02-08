import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {UserInterface} from "@authentication-based/core/interfaces";
import {} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() users: UserInterface[];
  @Input() columns: [];
  @Output() Edit = new EventEmitter<Object>();
  @Output() Delete = new EventEmitter<Object>();

  constructor() {
  }

  ngOnInit(): void {
  }

  edit(value: any) {
    this.Edit.emit(value)
  }

  delete(value: any) {
    this.Delete.emit(value)
  }

}

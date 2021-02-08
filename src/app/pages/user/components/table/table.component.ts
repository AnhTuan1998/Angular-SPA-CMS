import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {UserInterface} from "@authentication-based/core/interfaces";
import { NzModalService } from 'ng-zorro-antd/modal';

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

  constructor(private modal: NzModalService) {
  }

  ngOnInit(): void {
  }

  edit(value: any) {
    this.Edit.emit(value)
  }

  showDeleteConfirm(value: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete user',
      nzContent: '<b style="color: red;">' + value + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.Delete.emit(value),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}

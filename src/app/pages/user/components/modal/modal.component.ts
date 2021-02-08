import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() isOkLoading: boolean;
  @Input() type: string;
  @Input() formData: any;
  @Output() Cancel = new EventEmitter<any>();
  @Output() Submit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.Cancel.emit(this.formData)
  }

  handleOk(): void {
    this.Submit.emit(this.formData)
  }

}

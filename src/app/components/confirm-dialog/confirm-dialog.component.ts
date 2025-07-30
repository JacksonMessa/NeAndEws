import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefaultButton } from "../default-button/default-button";

@Component({
  selector: 'confirm-dialog',
  imports: [DefaultButton],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() confirmBtnText = "Yes";
  @Input() declineBtnText = "No";
  @Input() id:string = "confirmDialog";
  @Output() confirm = new EventEmitter();

  onConfirm(){
    this.confirm.emit()
  }
}

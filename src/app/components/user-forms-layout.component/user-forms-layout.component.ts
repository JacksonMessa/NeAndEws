import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'user-forms-layout',
  imports: [
    NgOptimizedImage,
    DefaultButton
  ],
  templateUrl: './user-forms-layout.component.html',
  styleUrl: './user-forms-layout.component.scss',
})
export class UserFormsLayoutComponent {

  @Input() title:string = "";
  @Input() submitButtonText:string ="";
  @Input() navigateButtonText:string ="";
  @Input() disableSubmitButton:boolean = false;
  @Output() submit = new EventEmitter();
  

  onSubmit(){
    this.submit.emit()
  }

}

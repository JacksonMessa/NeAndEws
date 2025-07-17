import { Component, EventEmitter, Input, Output } from '@angular/core';

type BtnClass = "normal"|"outline"|"outline-white"

@Component({
  selector: 'default-button',
  imports: [],
  templateUrl: './default-button.html',
  styleUrl: './default-button.scss'
})
export class DefaultButton {
  @Input() text:string = "";
  @Input() btnClass:BtnClass = "normal";
  @Input() disabled:boolean = false;
  @Output() click = new EventEmitter();

  onClick(){
    this.click.emit()
  }
  
}

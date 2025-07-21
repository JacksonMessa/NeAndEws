import { Component, EventEmitter, Input, Output } from '@angular/core';

type BtnStyle = "normal"|"outline"|"outline-white"|"small"
type Size = "medium"|"small";

@Component({
  selector: 'default-button',
  imports: [],
  templateUrl: './default-button.html',
  styleUrl: './default-button.scss'
})
export class DefaultButton {
  @Input() text:string = "";
  btnClass!:string;
  @Input() btnStyle:BtnStyle = "normal";
  @Input() size:Size = "medium";
  @Input() disabled:boolean = false;
  @Output() click = new EventEmitter();

  ngOnInit(){
    this.btnClass = this.btnStyle + " " + this.size;
  }

  onClick(){
    this.click.emit()
  }
  
}

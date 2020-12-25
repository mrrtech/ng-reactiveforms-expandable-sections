import { Directive, HostListener } from '@angular/core';
import {NgControl} from '@angular/forms';
@Directive({
  selector: '[appPhonemask]'
})
export class PhonemaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange',['$event'])
  onModelChange(event) {
    this.onInputChange(event, false)
  }

  @HostListener('keydown.backspace',['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true)
  }

  onInputChange(event,backspace){
    let newValue= '';
    if(event !== undefined && event !== null && event !== ''){
      newValue = event.replace(/\D/g,'');
    }
    if(backspace && newValue.length <=6){
      newValue = newValue.substring(0, newValue.length - 1);
    }
    if(newValue.length === 0) {
      newValue = ''
    } else if(newValue.length <= 3){
      newValue = newValue.replace(/^(\d{0,3})/, '($1)');
    }else if(newValue.length <= 6){
      newValue = newValue.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    }else if(newValue.length <= 10){
      newValue = newValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }else {
      newValue = newValue.substring(0,10);
      newValue = newValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    this.ngControl.valueAccessor.writeValue(newValue);
  }

}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[TextOnly]'
})
export class TextOnlyDirective {

  constructor(private el:ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

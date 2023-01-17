
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPercentageSuffix]'
})
export class PercentageSuffixDirective {

  constructor(private el: ElementRef) { }

  //Use to add % suffix in text inputs
  ngOnInit() {
    this.el.nativeElement.addEventListener('blur', (event: any) => {
      if(!isNaN(event.target.value) && !event.target.value.includes('%') && event.target.value != '')
        event.target.value = event.target.value + '%';
    });
  }
}
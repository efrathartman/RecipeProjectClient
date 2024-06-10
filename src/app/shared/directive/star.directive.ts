import { Directive, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStar]',
  standalone: true
})
export class StarDirective implements OnChanges {

 
  @Input('appStar') starCount: number = 0 ;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['starCount']) {
      this.updateStars();
    }
  }

  private updateStars() {
    this.el.nativeElement.innerHTML = '★'.repeat(this.starCount);
  }


}

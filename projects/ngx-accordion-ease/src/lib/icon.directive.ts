import { Directive, HostBinding, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[ngxAccordionIcon]',
  standalone: true,
  host: { class: 'ngx-accordion-icon' },
})
export class AccordionIcon {
  @Input() transitionTiming = '0.3s ease-out';
  open = false;

  constructor(private element: ElementRef<HTMLElement>) {}

  get native() {
    return this.element.nativeElement;
  }

  get transition() {
    return this.transitionTiming;
  }

  toggleOpen(transition = this.transitionTiming) {
    this.native.style.transition = `transform ${transition}`;
    this.open = !this.open;
  }

  openClose(open: boolean, transition = this.transitionTiming) {
    this.native.style.transition = `grid-template-rows ${transition}`;
    this.open = open;
  }

  @HostBinding('class.open')
  get rotate() {
    return this.open;
  }
}

import {
  Directive,
  ElementRef,
  HostBinding,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[ngxAccordionContent]',
  standalone: true,
  host: { class: 'ngx-accordion-content' },
})
export class AccordionContent implements AfterViewInit {
  @Input() transitionTiming = '0.3s ease-out';
  open = false;

  constructor(private element: ElementRef<HTMLDivElement>) {}

  get native() {
    return this.element.nativeElement;
  }

  get transition() {
    return this.transitionTiming;
  }

  get isOpen() {
    return this.open;
  }

  toggleOpen(transition = this.transitionTiming) {
    this.native.style.transition = `grid-template-rows ${transition}`;
    this.open = !this.open;
  }

  openClose(open: boolean, transition = this.transitionTiming) {
    this.native.style.transition = `grid-template-rows ${transition}`;
    this.open = open;
  }

  /**
   * Wrap the content inside a container to allow animation on grid on a single element (0 => 1fr)
   * to place inside aftercontentinit?
   */
  ngAfterViewInit() {
    const children = Array.from(this.native.childNodes);
    const parentWrapper = document.createElement('div');
    parentWrapper.classList.add('content-wrapper');

    for (const child of children) {
      parentWrapper.append(child);
    }

    this.native.append(parentWrapper);
  }

  @HostBinding('class.open')
  get opened() {
    return this.open;
  }
}

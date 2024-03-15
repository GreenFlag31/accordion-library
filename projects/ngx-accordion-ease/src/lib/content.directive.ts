import {
  Directive,
  ElementRef,
  HostBinding,
  AfterViewInit,
  Input,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: '[ngxAccordionContent]',
  standalone: true,
  host: { class: 'ngx-accordion-content' },
})
export class AccordionContent implements AfterContentInit, AfterViewInit {
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
  ngAfterContentInit(): void {
    const children = Array.from(this.native.childNodes);
    const parentWrapper = document.createElement('div');
    parentWrapper.classList.add('content-wrapper');

    for (const child of children) {
      parentWrapper.append(child);
    }

    this.native.append(parentWrapper);
  }

  ngAfterViewInit() {}

  @HostBinding('class.open')
  get opened() {
    return this.open;
  }
}

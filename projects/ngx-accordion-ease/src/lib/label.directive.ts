import { ContentChild, Directive, ElementRef, Input } from '@angular/core';
import { AccordionIcon } from './icon.directive';

@Directive({
  selector: '[ngxAccordionLabel]',
  standalone: true,
  host: { class: 'ngx-accordion-label' },
})
export class AccordionLabel {
  @Input() defaultOpen = false;
  @Input() disabled = false;

  @ContentChild(AccordionIcon) icon!: AccordionIcon;

  constructor(private element: ElementRef<HTMLElement>) {}

  get native() {
    return this.element.nativeElement;
  }
}

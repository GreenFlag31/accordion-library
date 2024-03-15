import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { AccordionLabel } from './label.directive';
import { AccordionContent } from './content.directive';
import { AccordionService } from './accordion.service';
import { State, StateAll } from './interface';

@Directive({
  selector: '[ngxAccordion]',
  standalone: true,
  host: { class: 'ngx-accordion' },
})
export class Accordion implements OnInit, AfterContentInit {
  @Input() selection: 'single' | 'multiple' = 'multiple';

  @ContentChildren(AccordionLabel) labels!: QueryList<AccordionLabel>;
  @ContentChildren(AccordionContent) contents!: QueryList<AccordionContent>;

  constructor(
    private element: ElementRef,
    private accordionService: AccordionService
  ) {}

  get native() {
    return this.element.nativeElement;
  }

  ngOnInit() {
    const data = { instance: this, element: this.native };
    this.accordionService.populateAccordions(data);
  }

  ngAfterContentInit() {
    this.activateDefaultLabels();
  }

  activateDefaultLabels() {
    for (let i = 0; i < this.labels.length; i++) {
      const [label, content] = this.getLabelAndContent(i);

      if (label?.defaultOpen && !label?.disabled && content) {
        content.openClose(true, '0s');
        label.icon?.openClose(true, '0s');
        this.notifyState(label, content, true);
        if (this.selection === 'single') break;
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    for (let i = 0; i < this.labels.length; i++) {
      const [label, content] = this.getLabelAndContent(i);

      if (
        label?.native.contains(e.target as HTMLElement) &&
        label?.disabled === false &&
        content
      ) {
        this.closeAllSingleSelectionExclusion(i);
        content.toggleOpen();
        label.icon?.toggleOpen();
        this.notifyState(label, content, true);
        break;
      }
    }
  }

  /**
   * Toggle selection
   * If single selection, close all excepted the first one in the array of indexes.
   */
  toggle(indexes: number[] | undefined, animation: boolean) {
    if (indexes === undefined) {
      indexes = [...Array(this.labels.length).keys()];
    }
    this.closeAllSingleSelectionExclusion(indexes[0]);

    for (const index of indexes) {
      const [label, content] = this.getLabelAndContent(index);
      if (!label || label?.disabled || !content) continue;

      const animateContent = animation ? content.transition : '0s';
      const animateLabel = animation ? label.icon?.transition : '0s';
      content.toggleOpen(animateContent);
      label.icon?.toggleOpen(animateLabel);
      this.notifyState(label, content, true);
      if (this.selection === 'single') break;
    }
  }

  closeAllSingleSelection() {
    if (this.selection === 'single') {
      this.openCloseAll(false, true);
    }
  }

  closeAllSingleSelectionExclusion(exclusion: number) {
    if (this.selection === 'single') {
      let index = -1;

      for (const label of this.labels) {
        index += 1;
        if (exclusion === index) continue;
        this.triggerOpenCloseTab(index, true, false);
      }
    }
  }

  notifyState(
    label: AccordionLabel,
    content: AccordionContent,
    notificationEnabled: boolean
  ) {
    if (!notificationEnabled) return;

    const state: State = { label: label.native, open: content.isOpen };
    this.accordionService.onOpen.next(state);
  }

  openClose(open: boolean, index: number, animation: boolean) {
    this.closeAllSingleSelection();
    this.triggerOpenCloseTab(index, animation, open);
  }

  triggerOpenCloseTab(index: number, animation: boolean, open: boolean) {
    const [label, content] = this.getLabelAndContent(index);

    if (!label || label?.disabled || !content) return;

    const notification = content.isOpen !== open;
    const animateContent = animation ? content.transition : '0s';
    const animateIcon = animation ? label.icon?.transition : '0s';
    content.openClose(open, animateContent);
    label.icon?.openClose(open, animateIcon);
    this.notifyState(label, content, notification);
  }

  /**
   * openAll not enabled in case of single selection
   */
  openCloseAll(open: boolean, animation: boolean) {
    if (this.selection === 'single' && open) return;

    let index = 0;
    for (const label of this.labels) {
      this.triggerOpenCloseTab(index, animation, open);
      index += 1;
    }

    const stateAll: StateAll = {
      accordion: this.native,
      open,
    };
    this.accordionService.onOpenAll.next(stateAll);
  }

  getLabelAndContent(
    index: number
  ): [AccordionLabel | undefined, AccordionContent | undefined] {
    return [this.labels.get(index), this.contents.get(index)];
  }
}

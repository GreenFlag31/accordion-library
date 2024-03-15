import { Injectable } from '@angular/core';
import {
  AccordionData,
  OpenClose,
  OpenCloseAll,
  Toggle,
  State,
  StateAll,
} from './interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  accordions: AccordionData[] = [];
  onOpen = new Subject<State>();
  onOpenAll = new Subject<StateAll>();

  constructor() {}

  populateAccordions(accordion: AccordionData) {
    this.accordions.push(accordion);
  }

  /**
   * Toggle tab(s) in an accordion. If activeIndex is not defined, all tabs will be toggled.
   * @param option
   * ```
   * accordion: ElementRef<HTMLElement>;
   * activeIndex?: number[];
   * animation: boolean;
   * ```
   */
  toggle(option: Toggle) {
    for (const accordion of this.accordions) {
      const { instance, element } = accordion;
      const { accordion: acc, activeIndex: indexes, animation } = option;

      if (acc.nativeElement === element) {
        instance.toggle(indexes, animation);
        break;
      }
    }
  }

  /**
   * Open a tab in an accordion
   * @param open
   * ```
   * accordion: ElementRef<HTMLElement>;
   * index: number;
   * animation: boolean;
   * ```
   *
   */
  open(open: OpenClose) {
    for (const accordion of this.accordions) {
      const { instance, element } = accordion;
      const { index, animation } = open;

      if (open.accordion.nativeElement === element) {
        instance.openClose(true, index, animation);
        break;
      }
    }
  }

  /**
   * Close a tab in an accordion
   * @param close
   * ```
   * accordion: ElementRef<HTMLElement>;
   * index: number;
   * animation: boolean;
   * ```
   *
   */
  close(close: OpenClose) {
    for (const accordion of this.accordions) {
      const { instance, element } = accordion;
      const { index, animation } = close;

      if (close.accordion.nativeElement === element) {
        instance.openClose(false, index, animation);
        break;
      }
    }
  }

  /**
   * Open all tabs in an accordion
   * @param openAll
   * ```
   * accordion: ElementRef<HTMLElement>;
   * animation: boolean;
   * ```
   */
  openAll(openAll: OpenCloseAll) {
    for (const accordion of this.accordions) {
      const { instance, element } = accordion;
      const { animation } = openAll;

      if (openAll.accordion.nativeElement === element) {
        instance.openCloseAll(true, animation);
        break;
      }
    }
  }

  /**
   * Close all tabs in an accordion
   * @param closeAll
   * ```
   * accordion: ElementRef<HTMLElement>;
   * animation: boolean;
   * ```
   */
  closeAll(closeAll: OpenCloseAll) {
    for (const accordion of this.accordions) {
      const { instance, element } = accordion;
      const { animation } = closeAll;

      if (closeAll.accordion.nativeElement === element) {
        instance.openCloseAll(false, animation);
        break;
      }
    }
  }
}

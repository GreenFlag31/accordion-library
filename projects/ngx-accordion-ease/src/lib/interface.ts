import { ElementRef } from '@angular/core';
import { Accordion } from './accordion.directive';

export interface AccordionData {
  instance: Accordion;
  element: HTMLElement;
}

export interface Toggle {
  accordion: ElementRef<HTMLElement>;
  activeIndex?: number[];
  animation: boolean;
}

export interface OpenClose {
  accordion: ElementRef<HTMLElement>;
  index: number;
  animation: boolean;
}

export interface OpenCloseAll {
  accordion: ElementRef<HTMLElement>;
  animation: boolean;
}

export interface State {
  label: HTMLElement;
  open: boolean;
}

export interface StateAll {
  accordion: HTMLElement;
  open: boolean;
}

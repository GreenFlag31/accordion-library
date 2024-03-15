import { NgModule } from '@angular/core';
import { Accordion } from './accordion.directive';
import { AccordionLabel } from './label.directive';
import { AccordionIcon } from './icon.directive';
import { AccordionContent } from './content.directive';

@NgModule({
  declarations: [],
  imports: [Accordion, AccordionLabel, AccordionContent, AccordionIcon],
  exports: [Accordion, AccordionLabel, AccordionContent, AccordionIcon],
})
export class AccordionModule {}

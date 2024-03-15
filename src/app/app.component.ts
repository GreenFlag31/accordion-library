import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  AccordionModule,
  AccordionService,
} from '../../projects/ngx-accordion-ease/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AccordionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('presentation') presentation!: ElementRef<HTMLElement>;

  constructor(private accordionService: AccordionService) {}

  ngOnInit() {
    this.accordionService.onOpen.subscribe((value) => {
      console.log(value);
    });
    this.accordionService.onOpenAll.subscribe((value) => {
      console.log(value);
    });
  }

  closeAll() {
    this.accordionService.closeAll({
      accordion: this.presentation,
      animation: false,
    });
    // this.accordionService.open({
    //   accordion: this.presentation,
    //   animation: true,
    //   index: 1,
    // });
    // this.accordionService.close({
    //   accordion: this.presentation,
    //   animation: true,
    //   index: 1,
    // });
    // this.accordionService.openAll({
    //   accordion: this.presentation,
    //   animation: true,
    // });
  }

  toggle() {
    this.accordionService.toggle({
      animation: true,
      accordion: this.presentation,
      activeIndex: [3],
    });
  }
}

# ngx-accordion-ease

# Description

ngx-accordion-ease is a versatile Angular library providing a simple, performant, and lightweight accordion. This library supports single or multiple accordions, animations, single or multiple selections, and many other options.

Support Angular version starts at v17.

# Demo

Live demonstration of the ngx-accordion-ease library [here](https://greenflag31.github.io/accordion-library/ngx-accordion-ease).

# Installation

You can install the library using the following command:

```
npm i ngx-accordion-ease
```

Import the stylesheet in your `styles.css`:
`@import "../node_modules/ngx-accordion-ease/src/lib/accordion.css";`

Add the `AccordionModule` to your module or standalone component.

# Usage

This library consists in a set of directives to apply in the template containing each a range of options:

```html
<div ngxAccordion #presentation>
  <label ngxAccordionLabel>
    <!-- Your label and icon -->
    <h4 class="label">General</h4>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ngxAccordionIcon>
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  </label>
  <div ngxAccordionContent>
    <!-- The content of your accordion -->
    <h5 class="title">General</h5>
    <div class="content">
      <p>This library offers a lightweight, easy to implement, and performant accordion. Implement an accordion in your application in no time!</p>
    </div>
  </div>
</div>
```

| Directive           | Option           | Default       | Description                                                                                                                               |
| ------------------- | ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ngxAccordion        | selection        | multiple      | Selection behavior of the accordion. Only one tab can be opened at a time in a single selection accordion. Value: 'single' or 'multiple'. |
| ngxAccordionLabel   | defaultOpen      | false         | Open the label by default. Animations are disabled.                                                                                       |
| ngxAccordionLabel   | disabled         | false         | Disable the label.                                                                                                                        |
| ngxAccordionIcon    | transitionTiming | 0.3s ease-out | Set the transition timing for the icon. Set it to zero to disable the transition.                                                         |
| ngxAccordionContent | transitionTiming | 0.3s ease-out | Set the transition timing for the content. Set it to zero to disable the transition.                                                      |

# AccordionService

This library exposes a `AccordionService` containing the following API:

````javascript
  /**
   * Toggle tab(s) in an accordion. If activeIndex is not defined, all tabs will be toggled.
   * @param option
   * ```
   * accordion: ElementRef<HTMLElement>;   // Provide a @ViewChild elementRef
   * activeIndex?: number[];               // An array of indexes to toggle (zero indexed)
   * animation: boolean;                   // Enable animation
   * ```
   */
  toggle(option: Toggle) {}


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
  open(open: OpenClose) {}


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
  close(close: OpenClose) {}


  /**
   * Open all tabs in an accordion
   * @param openAll
   * ```
   * accordion: ElementRef<HTMLElement>;
   * animation: boolean;
   * ```
   */
  openAll(openAll: OpenCloseAll) {}


  /**
   * Close all tabs in an accordion
   * @param closeAll
   * ```
   * accordion: ElementRef<HTMLElement>;
   * animation: boolean;
   * ```
   */
  closeAll(closeAll: OpenCloseAll) {}


  // RxJs Subject to let you notified over the status of a particular tab:
  interface State {
    label: HTMLElement;
    open: boolean;
  }
  onOpen = new Subject<State>();

  // RxJs Subject to let you notified over the status of a all tabs:
  interface StateAll {
    accordion: HTMLElement;
    open: boolean;
  }
  onOpenAll = new Subject<StateAll>();
````

Since multiple accordions on a page are possible, an `ViewChild() elementRef` has to be provided as first argument in the exposed methods. This library has been documented and should provide autocomplete and help from your code editor.

Following example toggles a tab in the specified accordion:

```javascript
this.accordionService.toggle({
  // ViewChild() elementRef attached to the template
  accordion: this.presentation,
  // The fourth item will be toggled
  activeIndex: [3],
  // Animation enabled
  animation: true,
});
```

# Change log

# Report a Bug

Please provide a detailed description of the encountered bug, including your options and the steps/actions that led to the issue. An accurate description will help me to reproduce the issue.

# Ngx-ease serie

You like this library? Discover the ngx-ease serie [here](https://www.npmjs.com/~greenflag31).

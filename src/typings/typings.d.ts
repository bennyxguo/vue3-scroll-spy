import { Directive } from 'vue'

export declare namespace ScrollSpy {
  export interface DefaultOptions {
    allowNoActive: boolean
    sectionSelector: string | null
    offset: number
    time: number
    steps: 30
    easing: string | null
    active: {
      selector: string | null
      class: string
    }
    link: {
      selector: string
    }
  }

  export interface ScrollSpyElement extends HTMLElement {
    '@@scrollSpyContext': {
      onScroll(): void
      options: DefaultOptions
      id: string | number
      eventEl: HTMLElement | Element | Window
      scrollEl: HTMLElement
      click?: any
    }
  }
}

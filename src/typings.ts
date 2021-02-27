export type ActiveOptions = {
  selector: string | null
  class: string
}

export type LinkOptions = {
  selector: string
}

export type DefaultOptions = {
  allowNoActive: boolean
  sectionSelector: string | null
  offset: number
  time: number
  steps: 30
  easing: string | null
  active: ActiveOptions
  link: LinkOptions
}

/** Custom ScrollSpy Element, injected @@scrollSpyContext key */
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

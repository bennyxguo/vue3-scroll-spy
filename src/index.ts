import { DefaultOptions, ScrollSpyElement } from './typings'
import { DirectiveBinding } from 'vue'
import { getOffsetTop, scrollSpyId, scrollSpyIdFromAncestors } from './utils'
import { scrollWithAnimation, Easing } from './animate'
import { App } from 'vue'

const defaults: DefaultOptions = {
  /**
   * allow no active sections when scroll position is outside
   * of the scroll-spy container. Default behavior is too keep
   * active at least one section in any case.
   */
  allowNoActive: false,
  /** The scrollable container */
  sectionSelector: null,
  /** Scroll offset from top */
  offset: 0,
  /** Animation timing */
  time: 500,
  /** Animation increment step  */
  steps: 30,
  /** Animation easing type */
  easing: null,
  /** Active class options */
  active: {
    selector: null,
    class: 'active'
  },
  /** Link options */
  link: {
    selector: 'a'
  }
}

const registerScrollSpy = (
  app: App,
  options?: { [key: string]: any }
): void => {
  /** Directive options */
  const defaultOptions = Object.assign({}, defaults, options || {})

  /**
   * Defining bodyScrollEl properties base on browsers like FF, ie
   */
  const bodyScrollEl = {}
  Object.defineProperty(bodyScrollEl, 'scrollTop', {
    get(): number {
      return document.body.scrollTop || document.documentElement.scrollTop
    },
    set(val): void {
      document.body.scrollTop = val
      document.documentElement.scrollTop = val
    }
  })

  Object.defineProperty(bodyScrollEl, 'scrollHeight', {
    get(): number {
      return document.body.scrollHeight || document.documentElement.scrollHeight
    }
  })

  Object.defineProperty(bodyScrollEl, 'offsetHeight', {
    get(): number {
      return window.innerHeight
    }
  })

  const scrollSpyContext = '@@scrollSpyContext'
  const scrollSpyElements: { [key: string]: ScrollSpyElement } = {}
  const scrollSpySections: { [key: string]: HTMLCollection | Element[] } = {}
  const activeElement: { [key: string]: ScrollSpyElement } = {}
  const canActiveElements: { [key: string]: ScrollSpyElement[] } = {}
  const currentIndex: { [key: string]: number | null } = {}

  app.directive('scroll-spy', {
    created(el, binding) {
      /** onScroll event handler of an Element */
      const onScroll = () => {
        const id = scrollSpyId(el)
        const idScrollSections = scrollSpySections[id]
        const { scrollEl, options } = el[scrollSpyContext]
        let index

        // Find the index of the spy context
        if (
          scrollEl.offsetHeight + scrollEl.scrollTop >=
          scrollEl.scrollHeight - 10
        ) {
          // Reached end of the spy context
          index = idScrollSections.length
        } else {
          for (index = 0; index < idScrollSections.length; index++) {
            if (
              getOffsetTop(idScrollSections[index], scrollEl) - options.offset >
              scrollEl.scrollTop
            ) {
              break
            }
          }
        }

        index--

        if (index < 0) {
          index = options.allowNoActive ? null : 0
        } else if (
          options.allowNoActive &&
          index >= idScrollSections.length - 1
        ) {
          const idScrollSection = idScrollSections[index]
          if (
            idScrollSection instanceof HTMLElement &&
            getOffsetTop(idScrollSections[index]) +
              idScrollSection.offsetHeight <
              scrollEl.scrollTop
          ) {
            index = null
          }
        }

        if (
          (!options.allowNoActive && index === 0) ||
          index !== currentIndex[id]
        ) {
          let idActiveElement = activeElement[id]
          if (idActiveElement) {
            idActiveElement.classList.remove(
              idActiveElement[scrollSpyContext].options.active.class
            )
            delete activeElement[id]
          }

          const currIndex = (currentIndex[id] = index)

          if (
            typeof currentIndex !== 'undefined' &&
            Object.keys(canActiveElements).length > 0 &&
            currIndex !== null
          ) {
            idActiveElement = canActiveElements[id][currIndex]
            activeElement[id] = idActiveElement

            if (idActiveElement) {
              idActiveElement.classList.add(
                idActiveElement[scrollSpyContext].options.active.class
              )
            }
          }
        }
      }

      const id = scrollSpyId(el)

      el[scrollSpyContext] = {
        onScroll,
        options: Object.assign({}, defaultOptions, binding.value),
        id: scrollSpyId(el),
        eventEl: el,
        scrollEl: el
      }

      scrollSpyElements[id] = el
      delete currentIndex[id]
    },
    mounted(el) {
      const {
        options: { sectionSelector }
      } = el[scrollSpyContext]
      initScrollSections(el, sectionSelector)
      const { eventEl, onScroll } = el[scrollSpyContext]
      eventEl.addEventListener('scroll', onScroll)

      onScroll()
    },
    updated(el, binding) {
      el[scrollSpyContext].options = Object.assign(
        {},
        defaultOptions,
        binding.value
      )

      const {
        onScroll,
        options: { sectionSelector }
      } = el[scrollSpyContext]

      initScrollSections(el, sectionSelector)
      onScroll()
    },
    unmounted(el) {
      const { eventEl, onScroll } = el[scrollSpyContext]
      eventEl.removeEventListener('scroll', onScroll)
    }
  })

  app.directive('scroll-spy-active', {
    created: scrollSpyActive,
    updated: scrollSpyActive
  })

  app.directive('scroll-spy-link', {
    mounted: function (el, binding) {
      const linkOptions = Object.assign({}, defaultOptions.link, binding.value)
      initScrollLink(el, linkOptions.selector)
    },
    updated: function (el, binding) {
      const linkOptions = Object.assign({}, defaultOptions.link, binding.value)
      initScrollLink(el, linkOptions.selector)
    },
    unmounted(el) {
      const linkElements = findElements(el, null)

      for (let i = 0; i < linkElements.length; i++) {
        const linkElement = linkElements[i]
        const id = scrollSpyId(el)
        const listener = scrollLinkClickHandler.bind(null, i, id)

        if (linkElement[scrollSpyContext].click) {
          linkElement.removeEventListener('click', listener)
          delete linkElement[scrollSpyContext]['click']
        }
      }
    }
  })

  function scrollLinkClickHandler(index: any, scrollSpyId: any, event: any) {
    event.preventDefault()
    scrollTo(scrollSpyElements[scrollSpyId], index)
  }

  function initScrollLink(el: any, selector: string) {
    const id = scrollSpyId(el)

    const linkElements = findElements(el, selector)

    for (let i = 0; i < linkElements.length; i++) {
      const linkElement = linkElements[i]

      const listener = scrollLinkClickHandler.bind(null, i, id)

      if (!linkElement[scrollSpyContext].click) {
        linkElement.addEventListener('click', listener)
        linkElement[scrollSpyContext].click = listener
      }
    }
  }

  function scrollTo(el: any, index: number) {
    const id = scrollSpyId(el)
    const idScrollSections = scrollSpySections[id]

    const { scrollEl, options } = el[scrollSpyContext]
    const current = scrollEl.scrollTop

    if (idScrollSections[index]) {
      const target = getOffsetTop(idScrollSections[index]) - options.offset
      if (options.easing) {
        scrollWithAnimation(
          scrollEl,
          current,
          target,
          options.time,
          options.easing
        )
        return
      }

      const ua = window.navigator.userAgent
      const msie = ua.indexOf('MSIE ')

      // If current browser is internet explorer.
      if (msie > 0) {
        const time = options.time
        const steps = options.steps
        const timeMs = parseInt(time) / parseInt(steps)
        const gap = target - current
        for (let i = 0; i <= steps; i++) {
          const pos = current + (gap / steps) * i
          setTimeout(() => {
            scrollEl.scrollTop = pos
          }, timeMs * i)
        }
        return
      }

      // Use window.scrollTo instead of moving by steps.
      // Beware Internet Explorer does not support this.
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      })
    }
  }

  /** Generating elements that can apply active classes */
  function scrollSpyActive(
    el: ScrollSpyElement,
    binding: DirectiveBinding
  ): void {
    const id = scrollSpyId(el)
    const activeOptions = Object.assign({}, defaultOptions, {
      active: {
        selector:
          binding.value && binding.value.selector
            ? binding.value.selector
            : defaultOptions.active.selector,
        class:
          binding.value && binding.value.class
            ? binding.value.class
            : defaultOptions.active.class
      }
    })
    const arr = [...findElements(el, activeOptions.active.selector)]

    canActiveElements[id] = arr.map((el: ScrollSpyElement) => {
      el[scrollSpyContext].options = activeOptions
      return el
    })
  }

  /** Initializing Scroll Sections */
  function initScrollSections(
    el: any,
    sectionSelector: string | null | undefined
  ) {
    const id = scrollSpyId(el)
    const scrollSpyContextEl = el[scrollSpyContext]
    const idScrollSections = findElements(el, sectionSelector)
    scrollSpySections[id] = idScrollSections

    // Binding eventEl and scrollEl on first element of a section
    if (
      idScrollSections[0] &&
      idScrollSections[0] instanceof HTMLElement &&
      idScrollSections[0].offsetParent !== el
    ) {
      scrollSpyContextEl.eventEl = window
      scrollSpyContextEl.scrollEl = bodyScrollEl
    }
  }

  /** Fetch elements from a container or base on a selector */
  function findElements(
    container: HTMLElement,
    selector: string | null | undefined
  ) {
    if (!selector) {
      return [...container.children].map((el) => {
        return initScrollSpyElement(el)
      })
    }

    const id = scrollSpyId(container)

    const elements = []

    for (const el of container.querySelectorAll(selector)) {
      // Filter out elements that are owned by another directive
      if (scrollSpyIdFromAncestors(el) === id) {
        elements.push(initScrollSpyElement(el))
      }
    }

    return elements
  }

  function initScrollSpyElement(el: any): ScrollSpyElement {
    const onScroll = () => {
      return
    }
    el[scrollSpyContext] = {
      onScroll,
      options: defaultOptions,
      id: '',
      eventEl: el,
      scrollEl: el
    }
    return el
  }
}

export { Easing, registerScrollSpy }

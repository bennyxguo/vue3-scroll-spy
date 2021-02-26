export function getOffsetTop(
  // eslint-disable-next-line
  elem: any,
  // eslint-disable-next-line
  untilParent: any = null
): number {
  let offsetTop = 0
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop
    }
    const offsetParent = elem.offsetParent
    if (offsetParent === null) break
    elem = offsetParent
  } while (elem && elem !== untilParent)
  return offsetTop
}

/**
 * Scroll-Spy-Id is used for
 * multiple Scroll Spy in a component
 *
 * Can add `data-scroll-spy-id=""` on
 * each element where a directive is declared
 */
export function scrollSpyId(el: Element): string {
  return (
    el.getAttribute('data-scroll-spy-id') ||
    el.getAttribute('scroll-spy-id') ||
    el.getAttribute('id') ||
    'default'
  )
}
// eslint-disable-next-line
export function scrollSpyIdDefined(el: any): boolean {
  return (
    !!el.getAttribute('data-scroll-spy-id') ||
    !!el.getAttribute('scroll-spy-id')
  )
}
// eslint-disable-next-line
export function scrollSpyIdFromAncestors(el: any): string {
  do {
    if (scrollSpyIdDefined(el)) {
      return scrollSpyId(el)
    }
    el = el.parentElement
  } while (el)
  return 'default'
}

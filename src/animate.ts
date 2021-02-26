/* eslint-disable */
import TWEEN from '@tweenjs/tween.js'

const requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

function animate() {
  if (TWEEN.update()) {
    requestAnimationFrame(animate)
  }
}

requestAnimationFrame(animate)

export const Easing = TWEEN.Easing

export function scrollWithAnimation(
  scrollEl: any,
  current: any,
  target: any,
  time: any,
  easing: any
): void {
  new TWEEN.Tween({ postion: current })
    .to({ postion: target }, time)
    .easing(easing || Easing.Cubic.In)
    .onUpdate(function (val: any) {
      scrollEl.scrollTop = val.postion
    })
    .start()

  animate()
}

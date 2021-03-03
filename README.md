<p align="center"><a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer"><img width="100" src="https://img-blog.csdnimg.cn/20200930013332450.png" alt="TriDiamond logo"></a></p>

<h1 align="center">Vue3 Scroll-Spy Directive</h1>

<div align="center">
  <p>Scrollspy and animated scroll-to for Vue3, inspired by <a href="https://github.com/ibufu/vue2-scrollspy">vue2-scrollspy</a>. <br>
  —— Made with ❤️ by <a href="https://github.com/TriDiamond">TriDiamond</a></p>

  <p align="center">
    <a href="https://github.com/TriDiamond/vue3-scroll-spy/stargazers">
      <img src="https://img.shields.io/github/stars/TriDiamond/vue3-scroll-spy.svg" alt="Github starts">
    </a>
    <a>
      <img src="https://img.shields.io/github/license/TriDiamond/vue3-scroll-spy.svg" alt="License">
    </a>
    <a href="https://www.npmjs.com/package/vue3-scroll-spy">
      <img src="https://img.shields.io/npm/dt/vue3-scroll-spy.svg" alt="Npm downloads">
    </a>
    <a href="https://www.npmjs.com/package/vue3-scroll-spy">
      <img src="https://img.shields.io/bundlephobia/minzip/vue3-scroll-spy.svg" alt="npm bundle size (minified + gzip)">
    </a>
    <a>
      <img src="https://img.shields.io/npm/v/vue3-scroll-spy.svg" alt="Npm version">
    </a>
  </p>

[Demo](https://tridiamond.github.io/vue3-scroll-spy/)
[｜ 📙 中文文档](https://github.com/TriDiamond/vue3-scroll-spy/blob/master/README_CN.md)
[｜ 📙 Changelog](https://github.com/TriDiamond/vue3-scroll-spy/blob/master/CHANGELOG.md)

</div>

## Installation

```bash
npm i vue3-scroll-spy -S
```

OR

```bash
yarn add vue3-scroll-spy
```

## Usage

### Support

| Supported Package | Version |
| ----------------- | ------- |
| Vue               | 3+      |

### Install Directive

```javascript
// global register at main.js
import { registerScrollSpy } from '@/directives/ScrollSpy'

const app = createApp(App)
// Using default options
registerScrollSpy(app)

// or custom global options
registerScrollSpy(app, options)

app.mount('#app')
```

### On template

```html
<ul v-scroll-spy-active v-scroll-spy-link>
  <li>
    <a>Menu 1</a>
  </li>
  <li>
    <a>Menu 2</a>
  </li>
</ul>

<div v-scroll-spy>
  <div>
    <h1>Header 1</h1>
    <p>Content</p>
  </div>
  <div>
    <h1>Header 2</h1>
    <p>Content</p>
  </div>
</div>
```

## Configuration

### v-scroll-spy

Binding scroll-spy to sections (or elements) of a container.

| Directive name                          | Description                                                                     | Default                                    |
| --------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| `v-scroll-spy="{allowNoActive: true}"`  | When scroll position is outside of the container, active class will be removed. | Keep one section stays active at all time. |
| `v-scroll-spy="{offset: 50}"`           | TAdding offset to scroll and active elements.                                   | Default: `0`                               |
| `v-scroll-spy="{time: 200, steps: 30}"` | Set the animation options, time is animation duration, steps is step per frame. | `{time: 200, steps: 30}`                   |

### v-scroll-spy-active

Setting active elements' `selector` and `class` properties.

| Directive name                                                             | Description                                 | Default                             |
| -------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| `v-scroll-spy-active="{selector: 'li.menu-item', class: 'custom-active'}"` | Customize elements selector and class name. | `{selector: null, class: 'active'}` |

### v-scroll-spy-link

Add `click handler` on children elements allow scrolling to the related section.

| Directive name                                  | Description                    | Default                             |
| ----------------------------------------------- | ------------------------------ | ----------------------------------- |
| `v-scroll-spy-link="{selector: 'a.menu-link'}"` | Customize menu links selector. | `{selector: null, class: 'active'}` |

### Bezier animations

```javascript
import { registerScrollSpy, Easing } from '@/directives/ScrollSpy'

const app = createApp(App)

// or custom global options
registerScrollSpy(app, {
  easing: Easing.Cubic.In
})

app.mount('#app')
```

## Note

- You should have the same number of children elements for `v-scroll-spy`, `v-scroll-spy-active`, `v-scroll-spy-link` for this directive to work correctly.
- If you need to share this scroll-spy directive on multiple containers, you can add `data-scroll-spy-id=""` on each element container, where this directive is bind.

### Nested sections

Vue3 Scroll-Spy also support multi-leveled sections:

```html
<ol
  v-scroll-spy
  v-scroll-spy-active="{selector: 'li.menu-item', class: 'active'}"
>
  <li class="menu-item">Item 1</li>
  <li class="menu-item">
    Item 2
    <ol>
      <li class="menu-item">Item 2.1</li>
      <li class="menu-item">Item 2.2</li>
    </ol>
  </li>
</ol>
```

## Liscense

MIT License

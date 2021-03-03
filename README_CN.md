<p align="center"><a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer"><img width="100" src="https://img-blog.csdnimg.cn/20200930013332450.png" alt="TriDiamond logo"></a></p>

<h1 align="center">Vue3 Scroll-Spy Directive</h1>

<div align="center">
  <p>滑动监听 Directive, 受 <a href="https://github.com/ibufu/vue2-scrollspy">vue2-scrollspy</a> 所启发. <br>
  —— <a href="https://github.com/TriDiamond">三钻</a> 使用 ❤️ 开发 </p>

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

[Demo](https://tridiamond.github.io/vue3-scrollspy/)
[｜ 📙 English](https://github.com/TriDiamond/vue3-scrollspy/blob/master/README.md)
[｜ 📙 更新文档](https://github.com/TriDiamond/vue3-scrollspy/blob/master/CHANGELOG.md)

</div>

## 安装

```bash
npm i vue3-scroll-spy -S

```

或者

```bash
yarn add vue3-scroll-spy
```

## 使用

### 支持

| 支持包 | 版本 |
| ------ | ---- |
| Vue    | 3+   |

### 引用 Directive

```javascript
// 在 main.js 全局注册
import { registerScrollSpy } from '@/directives/ScrollSpy'

const app = createApp(App)
// 使用默认配置
registerScrollSpy(app)

// 或者使用自定义配置
registerScrollSpy(app, options)

app.mount('#app')
```

### 模版上使用

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

## 配置

### v-scroll-spy

把 scroll-spy 绑定到一个盒子的元素之中。

| Directive 名                            | 描述                                              | 默认值                               |
| --------------------------------------- | ------------------------------------------------- | ------------------------------------ |
| `v-scroll-spy="{allowNoActive: true}"`  | 启动后当滑动超出盒子的范围外，active 状态就会消失 | 默认保持至少一个元素拥有 active 状态 |
| `v-scroll-spy="{offset: 50}"`           | 给 scroll 和 active 元素添加 offset               | 默认: `0`                            |
| `v-scroll-spy="{time: 200, steps: 30}"` | 设置动画的时常和动画的 step                       | `{time: 200, steps: 30}`             |

### v-scroll-spy-active

可设置 active 元素的 `selector` 和 `class` 属性。

| Directive 名                                                               | 描述                          | 默认值                              |
| -------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| `v-scroll-spy-active="{selector: 'li.menu-item', class: 'custom-active'}"` | 自定义元素的选择器和 class 名 | `{selector: null, class: 'active'}` |

### v-scroll-spy-link

给所有元素的子元素添加 `click` 点击时间，让点击菜单的时候页面滑动到对应的区域。

| Directive 名                                    | 描述               | 默认值                              |
| ----------------------------------------------- | ------------------ | ----------------------------------- |
| `v-scroll-spy-link="{selector: 'a.menu-link'}"` | 自定义菜单的选择器 | `{selector: null, class: 'active'}` |

### Bezier 动画

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

- `v-scroll-spy`, `v-scroll-spy-active`, `v-scroll-spy-link` 需要拥有相等的子元素，才能让这个 directive 正常运作。
- 如果需要在多个盒子中使用 scroll-spy directive，那就需要在每一个绑定了 `v-scroll-spy` 元素盒子上添加 `data-scroll-spy-id=""`。

### 嵌套菜单

Vue3 Scroll-Spy 也支持嵌套菜单：

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

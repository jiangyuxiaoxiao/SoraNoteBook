---
title: "零碎笔记"
date: 2023-07-20
description: ""
---
## 1 命名注意事项
### 1.1 组件命名
定义组件名的方式有两种：
+ **使用kebab-case**
```javascript
Vue.component('my-component-name', { /* ... */ })
```
当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`
+ **使用PascalCase**
```javascript
Vue.component('MyComponentName', { /* ... */ })
```
当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。**注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。**

### 1.2 组件prop命名
HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
```javascript
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```
```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```
**重申一次，如果你使用字符串模板，那么这个限制就不存在了。**

### 1.3 事件命名
**推荐始终使用kebab-case的事件命名**
不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个 camelCase 名字的事件：
```javascript
this.$emit('myEvent')
```
则监听这个名字的 kebab-case 版本是不会有任何效果的：
```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```
不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了。并且`v-on`事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以`v-on:myEvent`将会变成`v-on:myevent`——导致`myEvent`不可能被监听到。

### 1.4 总结
+ 对于组件的命名，推荐统一使用`kebab-case`命名方式
+ 对于组件prop的命名，在html即dom中使用`kebab-case`命名方式，而在JavaScript中使用camelCase命名方式。
+ 对于事件的命名，推荐统一使用`kebab-case`命名方式
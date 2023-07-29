---
title: "组件"
date: 2023-07-20
description: ""
---

## 组件基础

### 1 基本示例

```javascript
// 定义一个名为sora-button的新组件
Vue.component("sora-button", {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

+ **【定义】** 组件是可以复用的Vue实例。
+ **【特性】** 组件与`new Vue`接收相同的选项，例如`data`、`computed`、`watch`、`methods`以及生命周期钩子等。
  **仅有的例外为像`el`这样根实例特有的选项。**
+ **【特性】** 组件的`data`必须是一个函数，从而使组件的每个实例均可以维护一份被返回对象的独立拷贝
+ **【用法】** **我们可以在一个通过`new Vue`创建的Vue根实例中**，把这个组件作为自定义元素来使用：

```html

<div id="luoyi-demo">
    <sora-button></sora-button>
</div>
```

```javascript
new Vue({
    el: "#luoyi-demo"
    //...
})
```

### 2 组件的复用

每个组件的使用都会新创建一个实例，因此其包含的变量是独立维护的。具体的原理请看基本示例中的`特性`词条。

### 3 组件的组织

通常一个应用会以一颗嵌套的组件树的形式来组织。
![](/Vue/component.png)

观察此树不难发现，一个较上层级的大组件会利用几个小组件。为了能在大组件的模板中使用，这些组件必须先注册以便 Vue
能够识别。这里有两种组件的注册类型：`全局注册`和`局部注册`。至此，我们的组件都只是通过Vue.component全局注册的：

```javascript
Vue.component("sora-box", {
    //...
})
```

对于`全局注册`的组件，可以被其注册后新创建的Vue根实例使用，也包括组件树中的所有子组件的模板中。

### 4 通过prop向子组件传递数据

+ **【定义】** prop是可以在组件上注册的一些自定义属性，通过向这些属性传值，让组件可以访问这些变量。
+ **【用法】** 组件prop的定义如下所示如下所示

```javascript
Vue.component("sora-box", {
    props: ["soraName"],
    template: "<p>{{ soraName }}</p>"
})
```

+ **【用法】** 在html中，通过给对应的属性赋值从而将数据传递进组件中，如下所示：

```html
<!-- 注意，在html中，由于html不区分大小写，属性的命名是kebab-case的 -->
<sora-box sora-name="Kasugano Sora"></sora-box>
```

+ **【用法】** 当然，prop也可以通过`v-bind`进行动态绑定传递，如下所示：

```html

<sora-box
        v-bind:sora-name="sora.name"
></sora-box>
```

```javascript
// 此处需注意的是，组件的声明应该在下述Vue实例之前
Vue.component("sora-box", {
    props: ["soraName"],
    template: "<p>{{ soraName }}</p>"
})

new Vue({
    el: "#sora-info",
    data: {
        sora: {
            name: "Kasugano Sora"
            // ...
        }
    }
})
```

### 5 组件的根元素

+ **【特性】** 每个组件有且仅有一个根元素，当包含多个根元素时会报错。

### 6 监听子组件的事件

#### 6.1 自定义事件创建

子组件可以通过调用内建的`$emit`方法并传入事件名称来触发一个事件，例如：

```javascript
Vue.component("sora-button", {
    //...
    template:
        "<div>" +
        "<button v-on:click='$emit(\"sora-click\")'></button>" +
        "</div>"
})
```

#### 6.2 父组件监听子组件

父组件可以通过处理DOM事件一样，通过`v-on`监听子组件的任意事件。**注意，在父组件中，应该将`v-on`赋给触发这个事件的子组件**
。如下所示

```javascript
Vue.component("sora-box", {
    //...
    template:
        "<div>" +
        "<sora-button v-on:sora-click='count++'></sora-button>" +
        "</div>"
})
```

#### 6.3 事件监听参数传递

内建的`$emit`方法也可以抛出值，向`$emit`的第二个参数提供即可。

```javascript
// 子组件
Vue.component("sora-button", {
    //...
    template:
        "<div>" +
        "<button v-on:click='$emit(\"sora-click\", 1)'></button>" +
        "</div>"
})
```

然后当在父级组件监听这个事件的时候，我们可以通过`$event`访问到被抛出的这个值：

```javascript
// 父组件
Vue.component("sora-box", {
    //...
    template:
        "<div>" +
        "<sora-button v-on:sora-click='count+=$event'></sora-button>" +
        "</div>"
})
```

若事件处理函数是一个方法，则这个值将作为第一个参数传入这个方法

```javascript
// 父组件
Vue.component("sora-box", {
    //...
    methods: {
        soraClickHandler: (countNum) => {
            this.count += countNum
        }
    },
    template:
        "<div>" +
        "<sora-button v-on:sora-click='soraClickHandler'></sora-button>" +
        "</div>"
})
```

#### 6.4 在组件上使用`v-model`

自定义事件也可以用于创建支持`v-model`的自定义输入组件。

```html
<input v-model="searchText">
```

与下列代码等价：

```html
<input
        v-bind:value="searchText"
        v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model`等价于：

```html

<sora-input
        v-bind:value="searchText"
        v-on:input="searchText = $event"
></sora-input>   
```

为了让它正常工作，这个组件内的`<input>`必须：

+ 将其`value`属性绑定到一个名叫`value`的prop上
+ 在其`input`事件被触发时，将新的值通过自定义的`input`事件抛出
  写成代码后为这样：

```javascript
Vue.component('sora-input', {
    props: ['value'],
    template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

## 组件注册

### 1 组件命名

::: tip 归纳总结
[命名注意事项](/docs/FrontEnd/Vue/Vue2-snacks.html#_1-1-组件命名)   
:::
定义组件名的方式有两种：

+ **使用kebab-case**

```javascript
Vue.component('my-component-name', { /* ... */})
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用
kebab-case，例如 `<my-component-name>`

+ **使用PascalCase**

```javascript
Vue.component('MyComponentName', { /* ... */})
```

当使用 PascalCase (首字母大写命名)
定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>`
都是可接受的。**注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。**

### 2 全局注册

以`Vue.component`来创建的组件是`全局注册`的，例如：

```javascript
Vue.component("sora-box",
    //...
)

```

+ **【特性】** 对于全局注册的组件而言，在**注册后**可以用于任何新创建的Vue根实例的模板中（`new Vue`）
+ **【特性】** 对于全局注册的组件而言，可以互相作为子组件使用。

### 3 局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的
JavaScript 的无谓的增加。
在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```javascript
var ComponentSora = {/** ... **/}
```

然后在`components`选项中定义你想要使用的组件：

```javascript
new Vue({
    el: '#app',
    components: {
        'component-a': ComponentSora
    }
})
```

在上述components对象中，其属性名（`component-a`）就是自定义元素的名字。   
**注意，局部注册的组件不能作为子组件使用**，如果你希望`ComponentSora`在`ComponentLuoyi`中可用，则需要这样写：

```javascript
var ComponentSora = {/** ... **/}
var ComponentLuoyi = {
    componenets: {
        'component-a': ComponentSora
    }
}
```

## Prop

### 1 Prop命名

::: tip 归纳总结
[命名注意事项](/docs/FrontEnd/Vue/Vue2-snacks.html#_1-1-组件命名)   
:::
HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM
中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

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

### 2 类型

通常而言，prop可以以数组的形式列出：

```javascript
props : ["soraName", "luoyiName", "luoyiXP", "soraXP"]
```

prop也可以指定类型，此时prop以对象的形式列出：

```javascript
props: {
    soraName: String
}
```

类型的值可以为`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`等原生构造函数，**也可以是自定义的构造函数。
** 如下所示：

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}

Vue.component('blog-post', {
    props: {
        author: Person
    }
})
```

### 3 静态/动态值传递

#### 3.1 静态值传递

通过在html中对属性直接赋值即为prop的静态值传递：

```html

<sora-box title="luoyi"></sora-box>
```

#### 3.2 动态值传递

prop也可以通过`v-bind`进行动态赋值：

```html
<!-- 动态值传递 变量形式-->
<sora-box v-bind:title="luoyi.name"></sora-box>
<!-- 动态值传递 表达式形式-->
<sora-box v-bind:title="'sora-' + luoyi.name"></sora-box>
```

通过`v-bind`的形式，可以传入丰富的变量类型，其实质原理为，vue会将所赋属性视为如上述例子中的变量或者表达式，而非**字符串**

```html
<!-- 此处，传入的是数字40，而非字符串"40" -->
<sora-box v-bind:count="40"></sora-box>
<!-- 当然，也可以以变量或者表达式的形式进行赋值，此处将变量number与count进行绑定 -->
<sora-box v-bind:count="number"></sora-box>
```

此外，还可以传入布尔值，数组，对象等多种形式。

#### 3.3 传入一个对象所有属性

通过`v-bind="object-name"`的方式，可以将一个对象的所有属性均传入。例如，对于一个对象`luoyi`：

```javascript
luoyi = {
    name: "luoyi",
    birthMonth: 7
}
```

下面的模板

```html

<sora-box v-bind="luoyi"></sora-box>
```

等价于

```html

<sora-box
        v-bind:name="luoyi.name"
        v-bind:birthMonth="luoyi.birthMonth"
></sora-box>
```

### 4 单向数据流

prop的属性是一个**单向下行绑定**，这意味着，父prop的更新会向下更新其子prop，但是反过来不行。   
这意味着，**在设计时，不应该主动去更改一个子组件内部的prop值**。

### 5 验证

通过给prop的值定制一个带验证需求属性的对象来实现对prop传递时的验证。

```javascript
Vue.component('my-component', {
    props: {
        // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
            type: String,
            required: true
        },
        // 带有默认值的数字
        propD: {
            type: Number,
            default: 100
        },
        // 带有默认值的对象
        propE: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return {message: 'hello'}
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].includes(value)
            }
        }
    }
})
```

### 6 非Prop属性

+ **定义**：`非prop属性`指传递向一个组件，但是该组件没有相关prop定义的属性
+ **作用**：组件库的作者并不总是可以预见组件会被用于什么场景，有时候需要组件接受任意的属性

#### 6.1 属性替换/合并

+ 对于大多数属性来说，从外部传入的值会替换掉组件内设置的值。
+ 对于`class`和`style`属性来说，内外的值会被合并，从而获得最终的值
  举例：

```html

<sora-box class="sora" type="text"></sora-box>
```

```javascript
Vue.component("sora-box")
```

#### 6.2 $attrs

`$attrs`中的属性可以通过`v-bind`
指令绑定到子组件的任何元素上。这个对象包含了传递给组件但未被prop接收的所有属性。这在创建接口灵活的基础组件时非常有用，因为你可以很容易地将所有未被明确使用的属性向下传递到你想指定的内部元素。

举个例子，假设我们有一个自定义输入组件，它包含了一个标签和一个输入元素，我们想要将所有除`value`
之外的属性（例如`placeholder`、`id`等）传递给内部的`input`元素：

```html

<template>
    <div>
        <label>{{ label }}</label>
        <input :value="value" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inheritAttrs: false, // 这是重要的，以防止将属性添加到根元素
        props: {
            label: String,
            value: String
        }
    }
</script>

```

在这个例子中，`v-bind="$attrs"`将所有未被`props`接收的属性（如`placeholder`、`id`等）绑定到`input`元素上。
**这样做可以确保这些属性正确地出现在正确的地方，而不是被添加到根元素上（在这个例子中，根元素是`div`）**。

`inheritAttrs: false`用于阻止`Vue.js`将未被`props`接收的属性添加到根元素上。这是一个好的做法，因为它可以防止在应该在内部元素上出现的属性出现在根元素上。

注意，`v-bind="$attrs"`语法只在Vue 2.4.0及以上版本有效。

#### 6.3 继承禁用

如果不希望组件的根元素继承attribute，可以在组件中将`inheritAttrs`属性设置为`false`，如下所示：

```javascript
Vue.component("sora-box", {
    inheritAttrs: false,
    // ...
})
```

一般而言，`继承禁用`适合与`$attrs`配合使用，从而达到给组件中的元素定向赋值的目的。

**需要注意，即使设置了继承禁用，`style`和`class`属性仍然会被根元素继承**

---

## 自定义事件

### 1 命名

::: tip 归纳总结
[命名注意事项](/docs/FrontEnd/Vue/Vue2-snacks.html#_1-1-组件命名)   
:::
**推荐始终使用kebab-case的事件命名**
不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个
camelCase 名字的事件：

```javascript
this.$emit('myEvent')
```

则监听这个名字的 kebab-case 版本是不会有任何效果的：

```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```

不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase
了。并且`v-on`事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以`v-on:myEvent`
将会变成`v-on:myevent`——导致`myEvent`不可能被监听到。

### 2 事件触发与监听

子组件可以通过调用内建的`$emit`方法并传入事件名称来触发一个事件，例如：

```javascript
Vue.component("sora-button", {
    //...
    template:
        "<div>" +
        "<button v-on:click='$emit(\"sora-click\")'></button>" +
        "</div>"
})
```

父组件可以通过处理DOM事件一样，通过`v-on`监听子组件的任意事件。**注意，在父组件中，应该将`v-on`赋给触发这个事件的子组件**
。如下所示

```javascript
Vue.component("sora-box", {
    //...
    template:
        "<div>" +
        "<sora-button v-on:sora-click='count++'></sora-button>" +
        "</div>"
})
```

### 3 v-model ⏳

一个组件上的`v-model`默认会利用名为`value`的 prop 和名为`input`的事件，
**但是像单选框、复选框等类型的输入控件可能会将`value`
属性用于不同的目的。**`model`选项可以用来避免这样的冲突：

```javascript
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    // checkbox 即复选框类型。
    // change 为dom事件，当激活单选框（radio）或复选框（checkbox）时触发。
    template: `
    <input
      type="checkbox" 
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用`v-model`的时候：

```html

<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的`lovingVue`的值将会传入这个名为`checked`的 prop。同时当`<base-checkbox>`触发一个`change`
事件并附带一个新的值的时候，这个`lovingVue`的`property`将会被更新。

**注意你仍然需要在组件的`props`选项里声明`checked`这个 prop。**

## 插槽

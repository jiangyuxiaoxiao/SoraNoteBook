---
title: "Vue3零碎笔记"
date: 2023-07-28
description: ""
---

## Vue3编译报错合集

### 1. Vue3 Windows编译出错

Vue 3项目编译npm run build 编译后，Gin读取并运行，访问页面一片空白，并报以下错误：

Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "
text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.

+ 问题原因：

本地开发环境是Win 10, 偶尔发现在Linux上编译并运行没有这个错误，一切正常。原因是win 10注册表默认将将 javascript
类型文件Content-Type更改为 text/plain， 而Linux行访问的Content-Type是text/html。

+ 解决方式：
  修改windows注册表添加以下字符串值：

```text
[HKEY_CLASSES_ROOT\.js]
　　"Content Type"="text/javascript"

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\.js]
　　"Content Type"="text/javascript"
```

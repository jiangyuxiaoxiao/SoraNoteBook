---
title: "爬虫基本原理"
date: 2023-07-21
description: ""
---

## 1 HTTP基础

### 1.1 URI URL

+ **【定义】** URI：Uniform Resource Identifier，即统一资源标志符
+ **【定义】** URL：Universal Resource Locator，即统一资源定位符
+ **【定义】** URN：Universal Resource Name，即统一资源名称
+ **【总结】** URL是URI的真子集，也就是说每个URL都是URI，但URI不一定是URL。因为URN也是URL的子类，URN只命名资源但不定位资源。
+ **【总结】** 就目前而言，URN用得比较少，所以几乎所有的URI都是URL，一般的网页链接我们既可以称为URL也可以称为URI。

### 1.2 超文本

+ **【定义】** 超文本，即hypertext。网页源代码的HTML即可称为超文本。

### 1.3 HTTP HTTPS
HTTPS在HTTT下加入了SSL层，其传输的内容经过了SSL加密。其作用为：建立一个信息安全的通道来保证数据传输的安全，同时可以确认网站的真实性，使用了HTTPS的网站都可以通过点击浏览器地址栏的锁头标志来查看网站认证后的真实信息，也可以通过CA机构颁发的安全签章来查询。

### 1.4 HTTP请求的过程
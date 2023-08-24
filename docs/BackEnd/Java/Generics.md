---
title: "泛型"
date: 2023-08-21
description: ""
---
## 一. 简介

### 1. 泛型的意义

1. 记住集合中元素的类型
2. 通过泛型来构建类似于`集合`的更为通用的`方法`、`类`或者`接口`，避免重复写代码。
3. **`泛型`保证程序在编译时没有发出警告，那么在运行时不会产生`ClassCastException`异常**

### 2. 定义
所谓`泛型`，就是允许在定义`类`、`接口`、`方法`时使用`类型形参`。这个`类型形参`（或者叫`泛型`）将在声明变量、创建对象、调用方法时指定。

### 3. 用法

在菱形括号内指定元素的类型，由于在声明变量时已指定类型，因此后续的菱形括号内不需填入类型。

```java
List<String> soraList = new ArrayList<>();
```

## 二. 泛型使用

### 1. 泛型类
```java 
// Luoyi.java
import java.util.ArrayList;

// 泛型类
public class Luoyi<T> {
    // 使用泛型类型的成员变量
    private ArrayList<T> luoyiLyst;

    // 以泛型类型为返回值的方法
    public ArrayList<T> getLuoyiLyst() {
        return luoyiLyst;
    }

    // 以泛型类型为参数的函数
    public void appendLuoyi(T luoyi){
        luoyiLyst.add(luoyi);
    }
}
```
### 2. 泛型接口
接口也可以是泛型：
```java 
import java.util.ArrayList;

public interface Luoyi<T> {
    // 以泛型类型为返回值的方法
    public ArrayList<T> getLuoyiLyst();

    // 以泛型类型为参数的函数
    public void appendLuoyi(T luoyi);
}
```

### 3. 泛型类构造器
泛型类在定义`构造器`时，构造器名还是原来的类名。但是在调用`构造器`时可以使用`luoyi<T>`的形式。
```java
public class luoyi<T> {
    private T loyi;

    // 构造器
    luoyi(T lo) {
        loyi = lo;
    }
}

luoyi<String> luo = luoyi<String>(lo);
```

---
title: "Web开发"
date: 2023-08-22
description: ""
---
## 一. Web基础

**Java为网络支持提供了`java.net`包，该包下的`URL`和`URLConnection`等类提供了以编程方式访问Web服务的功能**

### 1. `InetAddress` IP地址类
```java
public class Main {
    public static void main(String[] args) {
        try {
            InetAddress myIp = Inet4Address.getByName("www.baidu.com");
            String ipStr = myIp.getHostAddress();
            System.out.println(ipStr);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
// 运行结果：
// 14.119.104.189
```
## 二. TCP编程

## 三. UDP编程

## 四. HTTP请求

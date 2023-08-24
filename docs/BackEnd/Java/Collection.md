---
title: "集合"
date: 2023-07-31
description: ""
---
## 零碎笔记

1. 使用Lambda表达式遍历集合：   
Java8为`Iterable`接口新增了一个`forEach(Consumer action)`默认方法。该方法所需参数类型为一个函数式接口，而`Iterable`是`Collection`接口的父接口，因此`Collection`集合可以直接调用该方法。示例如下：
```java
var list = new ArrayList();
list.add(1);
list.add(2);
list.add(3);
list.forEach(num -> {
    System.out.println("数字为：" + num);
});
```

2. `treeSet` `treeMap` 自定义排序：  
通过实现`Comparable`接口可以自定义排序。排序的顺序为**升序**。  
`compareTo`接口，当自定义的this > u时应该返回1，相等返回0，否则返回-1。如果需要降序排序，只需要将返回值取反即可。
```java
public class User implements Comparable<User> {
    private String name;
    private final Integer id;

    public User(String name, Integer id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // compareTo接口，当自定义的this > u时应该返回1，相等返回0，否则返回-1
    public int compareTo(User u) {
        if (Objects.equals(this.id, u.id)) {
            return 0;
        } else if (this.id > u.id) {
            return 1;
        } else {
            return -1;
        }
    }
}
```


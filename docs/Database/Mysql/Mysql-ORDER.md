---
title: "ORDER 排序"
date: 2023-07-28
description: ""
---

### 1 按单列排序

使用ORDER关键字可以对检索结果进行排序，默认的顺序为升序。

```sql
SELECT prod_name
FROM products;
```

### 2 按多列排序

按多列排序时，排序的顺序按由左到右的顺序优先进行。以下的例子中，先按`prod_price`进行排序，若有`prod_price`
无法区分顺序的相等项，则再按`prod_name`进行排序。

```sql
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price, prod_name;
```

### 3 `DESC`降序 `ASC`升序

+ 若不进行关键字指定，则默认为升序 ASC

+ **若进行关键字指定，对应的关键字仅影响直接位于其前的列名**。在下列查询中，按照`prod_price`降序、`prod_name`升序对查询结果进行排序。

```sql
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price DESC, prod_name;
```




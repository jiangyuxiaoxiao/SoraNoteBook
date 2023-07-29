---
title: "WHERE 筛选"
date: 2023-07-29
description: ""
---

### 1 `WHERE`关键字

通过`WHERE`关键字对检索结果进行筛选，如下所示：

```sql
SELECT prod_name, prod_price
FROM products
-- 选择其中prod_price = 2.5的行
WHERE prod_price = 2.50;
```

### 2 `WHERE`子句操作符

| 操作符     | 说明   |
|---------|------|
| =       | 等于   |
| <>      | 不等于  |
| !=      | 不等于  |
| <       | 小于   |
| <=      | 小于等于 |
| >       | 大于   |
| >=      | 大于等于 |
| BETWEEN | 在之间  |

其中，`BETWEEN`的两个值用`AND`进行连接：   
**注意，`BETWEEN`为闭区间**

```sql
SELECT prod_name, prod_price
FROM products
-- prod_price 在[5,10]之间
WHERE prod_price BETWEEN 5 AND 10;
```

### 3 `NULL`空值

通过 `IS NULL`或者`IS NOT NULL`来判断数据是否为空

```sql
SELECT prod_name
FROM products
WHERE prod_price IS NULL;
```

### 4 `AND`且、`OR`或、`NOT`非

通过`AND`来表示筛选条件的且逻辑

```sql
SELECT prod_id, prod_price, prod_name
FROM products
-- vend_id为1003且prod_price小于等于10
WHERE vend_id = 1003 AND prod_price <= 10;
```

通过`OR`来表示筛选条件的或逻辑

```sql
SELECT prod_name, prod_price
FROM products
-- vend_id为1003或prod_price小于等于10
WHERE vend_id = 1002 OR vend_id = 1003;
```

通过`NOT`来表示筛选条件的非逻辑

```sql
SELECT prod_name
FROM products
WHERE prod_price IS NOT NULL;
```

**注意，AND的运算优先级要高于OR。在表示时应该使用圆括号来明确运算优先关系**：

```sql
SELECT prod_name, prod_price
FROM products
WHERE (vend_id = 1002 OR vend_id = 1003) AND prod_price >= 10;
```

## 5 `IN`操作符

Mysql中`IN`与python中的`in`用法一样。注意区分`IN`与`BETWEEN`，两者是不同的。`BETWEEN`表示在一个闭区间中，而`IN`表示在一个元组中：

```sql
SELECT prod_name, prod_price
FROM products
-- vend_id 等于1002或者1005
WHERE vend_id IN (1002,1005)
ORDER BY prod_name;
```



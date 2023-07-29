---
title: "SELECT 检索"
date: 2023-07-28
description: ""
---
### 1 检索单列

```sql
-- 取出prod_name列
SELECT prod_name
-- 从products表中
FROM products
-- 限制检索5行
LIMIT 5 
-- 从第3行开始检索
OFFSET 3;
```

### 2 检索多列
```sql
-- 取出prod_name列
SELECT prod_name, prod_price, prod_num
-- 从products表中
FROM products;
```

### 3 检索所有列
```sql
-- 取出prod_name列
SELECT *
-- 从products表中
FROM products;
```

### 4 使用完全限定的表名
```sql
-- 取出products表中的prod_name列
SELECT products.prod_name
-- 从crashcourse数据库的products表中
FROM crashcourse.products;
```
---
title: "Mysql Shell"
date: 2023-07-28
description: ""
---
### mysql Shell 登录
```shell
# 一般来说，账号为默认管理员账号，即root，若为其他账号则需进行修改
mysql -u root -p
# 输入密码
```

### mysql密码修改
+ 使用管理员账户登录
```shell
mysql -u root -p
```
+ 切换到MYSQL数据库
```sql
-- 也可以在DataGrip中实现
use mysql;
```
+ 查看当前用户
```sql
select user,host from user;
```
+ 更改当前用户密码
```sql
set password for 'user'@'host' = password('LuoyilyIsAllYouNeed');
exit;
```
+ 查看是否修改成功
```shell
# 尝试登录即可
mysql -u root -p password
```
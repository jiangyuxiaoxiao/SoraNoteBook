---
title: "Docker指令"
date: 2023-07-28
description: ""
---

+ 设置容器开机自启
```shell
# 查看容器id
docker container ps
# 注意restart=always不要留空格
docker update --restart=always 容器ID
```

+ 查看容器详细信息
```shell
docker inspect 容器ID/镜像id
# 输出到文件
docker inspect 容器ID/镜像id > info.json
```
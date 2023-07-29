---
title: "Dockerfile构建"
date: 2023-07-28
description: ""
---
### 示例1 `Python`项目Hiyori
```dockerfile
# 所使用的基础镜像
FROM python:3.10.12-bookworm
# VOLUME 将指定目录挂载为匿名目录
VOLUME /app/Hiyori/Data
# 拷贝项目文件到docker目录
COPY ./Hiyori/ /app/Hiyori/
COPY ./requirements /app/Hiyori
# apt换源，对于不同的linux系统，其换源的目录不同，可以去清华源网站查看复制
COPY ./sources.list /etc/apt/sources.list
RUN apt-get update
# 由于项目运行时缺少一些库，因此进行安装
RUN apt-get install ffmpeg libsm6 libxext6 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxcomposite1:amd64 libxdamage-dev -y
# 设置默认的工作目录。注：即使设置了工作目录，COPY指令还是应该给全目录路径，如COPY ./Hiyori/ /app/Hiyori/
WORKDIR /app/Hiyori
# python安装环境依赖
RUN pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple
RUN pip install -r requirements -i https://pypi.tuna.tsinghua.edu.cn/simple
# 暴露端口12200，可以暴露多个端口
EXPOSE 12200
CMD ["python", "hiyori.py"]
```

### 示例2 `Nodejs`项目
```dockerfile
# 基础镜像 node
FROM node:latest
# 设置工作目录
WORKDIR /app/SoraNoteBook
# 复制package.json到容器中
COPY package.json /app/SoraNoteBook/
# npm换源
RUN npm config set registry https://registry.npmmirror.com/
# 安装依赖
RUN npm install
# 复制源码
# COPY ./.vuepress ./.vuepress 不复制了 家里没有我了.jpg
COPY README.md /app/SoraNoteBook/
# 端口设置
EXPOSE 12300
# 启动
CMD ["npm", "run", "dev"]
```
import {defineUserConfig} from "vuepress";
import type {DefaultThemeOptions} from "vuepress";
import recoTheme from "vuepress-theme-reco";


export default defineUserConfig({
    title: "Sora的笔记本",
    description: "Just playing around",
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        logo: "/SoraIcon.jpg",
        author: "Sora",
        authorAvatar: "/head.png",
        docsRepo: "https://https://github.com/jiangyuxiaoxiao/SoraNoteBook",
        docsBranch: "main",
        docsDir: "example",
        lastUpdatedText: "",
        catalogTitle: "章节目录",
        // series 为原 sidebar
        series: {
            // Python笔记本
            "/docs/BackEnd/Python/": [
                {
                    text: "首页",
                    children: ["Python"],
                },
                {
                    text: "基础语法",
                    children: ["Python-1"],
                },
                {
                    text: "爬虫",
                    children: ["/docs/BackEnd/Python/Spider/Spider"],
                },
            ],
            // Python爬虫笔记本
            "/docs/BackEnd/Python/Spider": [
                {
                    text: "Python爬虫笔记本",
                    children: ["Spider", "Basic"],
                },
            ],
            // Vue笔记本
            "/docs/FrontEnd/Vue/": [
                {
                    text: "Vue首页",
                    children: ["Vue"],
                },
                {
                    text: "Vue2",
                    children: ["vue2-forms", "Vue2-components", "Vue2-snacks", "Vue2-mistakes"],
                },
                {
                    text: "Vue3",
                    children: ["vue3-snacks"],
                },
            ],
            // Mysql笔记本
            "/docs/Database/Mysql": [
                {
                    text: "Mysql笔记本",
                    children: ["Mysql", "Mysql-command", "Mysql-SELECT", "Mysql-ORDER", "Mysql-WHERE"],
                }
            ],
            // Docker笔记本
            "/docs/Operation/Docker/": [
                {
                    text: "Docker笔记本",
                    children: ["Docker", "Docker-command", "Docker-build"],
                },
            ]
        },
        navbar: [
            {text: "首页", link: "/"},
            {
                text: "后端",
                children: [
                    {text: "Python", link: "/docs/BackEnd/Python/Python"},
                    {text: "Java", link: "/docs/BackEnd/Java/Java"},
                ]
            },
            {
                text: "算法",
                children: [
                    {text:"算法", link: "/docs/Algorithm/Algorithm"},
                    {text:"数据结构", link: "/docs/DataStructure/DataStructure"}
                ]
            },
            {
                text: "前端",
                children: [
                    {text: "HTML", link: "/docs/FrontEnd/HTML/HTML"},
                    {text: "CSS", link: "/docs/FrontEnd/CSS/CSS"},
                    {text: "JavaScript", link: "/docs/FrontEnd/JavaScript/JavaScript"},
                    {text: "Vue", link: "/docs/FrontEnd/Vue/Vue"},
                ]
            },
            {
                text: "数据库",
                children: [
                    {text: "Mysql", link: "/docs/Database/Mysql/Mysql"},
                    {text: "Redis", link: "/docs/Database/Redis/Redis"}
                ]
            },
            {
                text: "运维",
                children: [
                    {text: "Docker", link: "/docs/Operation/Docker/Docker"},
                    {text: "Shell", link: "/docs/Operation/Shell/Shell"}
                ]
            }
        ],
        // commentConfig: {
        //   type: 'valie',
        //   // options 与 1.x 的 valineConfig 配置一致
        //   options: {
        //     // appId: 'xxx',
        //     // appKey: 'xxx',
        //     // placeholder: '填写邮箱可以收到回复提醒哦！',
        //     // verify: true, // 验证码服务
        //     // notify: true,
        //     // recordIP: true,
        //     // hideComments: true // 隐藏评论
        //   },
        // },
    }),
    // debug: true,
});

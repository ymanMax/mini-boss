# miniApp-BOSS
仿BOSS直聘的原生微信小程序前端项目，提供岗位搜索、详情查询、用户信息管理等功能。

## 功能特性
- **微信用户授权**：支持获取微信用户基础信息
- **首页列表渲染**：展示最新的岗位列表信息
- **岗位关键字搜索**：支持根据关键词搜索岗位信息
- **岗位详情查询**：展示岗位的详细信息，包括公司介绍、职位要求等
- **地图展示公司位置**：使用地图展示公司的具体位置
- **用户历史查询记录**：记录用户的历史查询记录
- **用户个人详情页**：展示用户的个人信息
- **用户基础信息修改**：支持修改用户的头像、姓名、性别、年龄、学历、工作年限、自我描述等信息
- **图片裁剪**：支持对上传的头像进行裁剪
- **用户期望岗位管理**：支持添加和修改用户的期望岗位信息
- **用户在职状态修改**：支持修改用户的在职状态
- **在线简历**：支持用户创建和编辑在线简历
- **简易后台管理**：提供简易的后台管理界面，后期会开发对应面向B端的后台管理系统

## 技术栈
- **开发框架**：微信小程序原生框架
- **数据请求**：使用wx.request API进行数据请求
- **本地存储**：使用wx.setStorageSync和wx.getStorageSync API进行本地存储
- **UI设计**：使用微信小程序原生组件进行UI设计
- **地图功能**：使用微信小程序地图组件展示公司位置
- **图片裁剪**：使用微信小程序画布组件实现图片裁剪功能

## 使用方法
1. 下载微信开发者工具
2. 克隆或下载本项目代码
3. 打开微信开发者工具，导入本项目代码
4. 点击“编译”按钮，即可运行本项目

## 项目结构
```
mini-boss/
├── app.js              # 小程序入口文件
├── app.json            # 小程序配置文件
├── app.wxss            # 小程序全局样式文件
├── utils/              # 小程序工具类文件夹
│   ├── mockData.js     # 模拟数据文件
│   └── promission.js   # 权限管理文件
├── pages/              # 小程序页面文件夹
│   ├── home/           # 首页文件夹
│   ├── wxAuth/         # 微信授权页面文件夹
│   ├── profile/        # 个人中心页面文件夹
│   ├── 404/            # 404页面文件夹
│   ├── message/        # 消息页面文件夹
│   ├── search/         # 搜索页面文件夹
│   └── secPage/        # 二级页面文件夹
│       ├── jobDetail/  # 岗位详情页面文件夹
│       ├── map/         # 地图页面文件夹
│       ├── jobTypesList/# 岗位类型列表页面文件夹
│       ├── expectPage/  # 期望岗位页面文件夹
│       ├── manage/      # 管理页面文件夹
│       ├── onlineResume/# 在线简历页面文件夹
│       ├── userBaseInfo/# 用户基础信息页面文件夹
│       ├── imageCut/    # 图片裁剪页面文件夹
│       └── editUserDesc/# 编辑用户描述页面文件夹
├── project.config.json  # 小程序项目配置文件
└── project.private.config.json  # 小程序私有配置文件
```

## 页面路由
- **首页列表页**：`pages/home/home`
- **微信授权页**：`pages/wxAuth/wxAuth`
- **个人中心页**：`pages/profile/profile`
- **404页**：`pages/404/404`
- **消息页**：`pages/message/message`（暂未开发）
- **搜索页**：`pages/search/search`
- **岗位详情页**：`pages/secPage/jobDetail/jobDetail`
- **地图页**：`pages/secPage/map/map`
- **岗位类型列表页**：`pages/secPage/jobTypesList/jobTypesList`
- **期望岗位页**：`pages/secPage/expectPage/expectPage`
- **管理页**：`pages/secPage/manage/manage`
- **在线简历页**：`pages/secPage/onlineResume/onlineResume`
- **用户基础信息页**：`pages/secPage/userBaseInfo/userBaseInfo`
- **图片裁剪页**：`pages/secPage/imageCut/imageCut`
- **编辑用户描述页**：`pages/secPage/editUserDesc/editUserDecs`

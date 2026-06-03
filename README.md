# 翔腾机械官网

翔腾机械官网是一个纯静态的企业展示网站，用于展示公司产品和服务信息。

## 项目简介

本项目是一个基于传统Web技术开发的机械制造企业官网，包含产品展示、公司介绍、联系方式和预约参观等功能模块。

## 技术栈

- **前端技术**: HTML5 / CSS3 / JavaScript (ES6+)
- **样式框架**: 自定义 CSS (响应式设计)
- **表单服务**: EmailJS
- **图标**: Font Awesome

## 项目结构

```
翔腾机械_01/
├── assets/              # 静态资源
│   ├── home/           # 首页图片资源
│   └── products/       # 产品图片资源
├── css/                # 样式文件
│   ├── style.css       # 全局通用样式
│   ├── index.css       # 首页样式
│   ├── products.css    # 产品中心样式
│   ├── about.css       # 关于我们样式
│   ├── contact.css     # 联系我们样式
│   └── booking.css     # 预约参观样式
├── js/                 # JavaScript 文件
│   ├── components.js   # 公共组件（导航栏、底部信息栏等）
│   ├── products.js     # 产品中心功能
│   └── common.js       # 通用工具函数
├── index.html          # 首页
├── products.html       # 产品中心
├── about.html          # 关于我们
├── contact.html        # 联系我们
├── booking.html        # 预约参观
└── README.md           # 项目说明
```

## 功能特性

### 1. 首页
- 响应式主图展示
- 浮动联系按钮
- 产品快速预览
- 公司简介展示

### 2. 产品中心
- 分类导航（岩板热弯盆机器、岩板深加工机器、陶瓷深加工机器）
- 产品卡片展示（最多5列自适应）
- 产品详情查看（点击卡片进入）
- **照片画廊功能**:
  - 多张产品图片平铺展示
  - 点击缩略图切换主图
  - 点击主图全屏查看
  - 支持键盘导航（← → 切换，ESC 关闭）
  - 支持触摸滑动切换（移动端）
  - 图片加载状态提示
  - 加载失败友好提示

### 3. 关于我们
- 公司介绍
- 发展历程
- 企业文化

### 4. 联系我们
- 公司联系方式
- 地图展示
- 联系表单（支持发送邮件）

### 5. 预约参观
- 预约表单（姓名、电话、邮箱、日期、人数、时间段）
- 表单验证
- EmailJS 邮件发送
- 提交成功/失败提示

## 快速开始

### 安装依赖

本项目为纯静态网站，无需安装依赖。

### 运行项目

**方法一：使用 Python HTTP 服务器**

```bash
cd jiaju_01
python -m http.server 8000
```

**方法二：使用 Node.js HTTP 服务器**

```bash
cd jiaju_01
npx http-server -p 8000
```

**方法三：直接打开**

直接使用浏览器打开 `index.html` 文件即可预览。

### 访问地址

启动后访问：http://localhost:8000

## 响应式适配

- **桌面端**: 完整功能展示
- **平板端**: 自适应布局调整
- **移动端**: 简化导航和布局

## 表单服务配置

预约参观和联系表单使用 EmailJS 服务发送邮件，配置信息如下：

- **公钥**: zovN2ceDxO5PBgCrk
- **服务ID**: service_gq4unos
- **模板ID**: template_efmvjfu

## 开发说明

### 添加新产品

编辑 `js/products.js` 文件中的 `products` 数组，添加新产品对象：

```javascript
{
  id: 13,
  name: '产品名称',
  category: 'living',      // living | bedroom | dining
  categoryLabel: '分类名称',
  image: '产品主图URL',
  images: [                // 多张图片用于画廊展示
    '图片1URL',
    '图片2URL',
    // ...
  ]
}
```

### 修改样式

所有样式文件位于 `css/` 目录，按页面功能划分：

- `style.css`: 全局样式（导航栏、底部信息栏、浮动按钮等）
- `index.css`: 首页特定样式
- `products.css`: 产品中心样式（包含照片画廊样式）
- `about.css`: 关于我们样式
- `contact.css`: 联系我们样式
- `booking.css`: 预约参观样式

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系：

- 公司名称：翔腾机械
- 地址：广东省佛山市顺德区
- 电话：0757-XXXXXX
- 邮箱：contact@xiangteng.com
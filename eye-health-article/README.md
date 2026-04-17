# 👁 把"视界"还给你 — 6·6 全国爱眼日推文

一篇完整的**公众号 H5 推文**作品，契合 2026 "全国爱眼日"主题，
为深圳市眼科医院设计的眼健康科普 + 公益活动导流页面。

> **永久链接** 形式提交 → 一键 Vercel 部署。

---

## ✨ 亮点

| 模块 | 亮点 |
|------|------|
| **封面**          | SVG 眼球插画 + 呼吸动画 + 大标题 |
| **数据可视化**    | 4 张统计卡片 + 滚动入场数字动画（IntersectionObserver） |
| **互动视力表**    | 可点击 E 字视力表，依据选择给出不同反馈 |
| **眼球解剖 SVG**  | 悬停/点击各部位查看知识卡片 |
| **常见眼病手风琴** | 原生 `<details>` 折叠展示 5 种眼病 |
| **服务项目表**    | 响应式表格，列出医院主要专科服务 |
| **护眼指数测评**  | 5 道单选题，实时进度条 + 结果评价 |
| **公益活动海报**  | 限时活动 + SVG 二维码 |
| **点赞/在看**     | localStorage 持久化，点击爱心飞出动效 |
| **分享**          | Web Share API + 复制链接降级 |

全部使用**原生 HTML / CSS / JS**，零依赖，首屏 <100KB。

## 🚀 快速部署到 Vercel

### 方法 1：CLI 一键部署
```bash
cd eye-health-article
npx vercel --prod
```

### 方法 2：Dashboard 导入
1. 进入 [vercel.com/new](https://vercel.com/new)
2. 选择当前 Git 仓库，Root Directory 填 `eye-health-article`
3. 框架预设选择 **Other**（静态站点）
4. 点击 **Deploy** 即可获得永久链接

### 方法 3：直接拖拽
把 `eye-health-article` 目录直接拖到 Vercel Dashboard 上传即可。

## 🧪 本地预览

```bash
cd eye-health-article
npx serve . -l 3000
# 或任意静态服务器
python3 -m http.server 3000
```
浏览器访问 `http://localhost:3000`。

## 📁 文件结构

```
eye-health-article/
├── index.html      主页面
├── style.css       样式（含响应式 / 微信风格）
├── script.js       交互逻辑（视力表/解剖/测试/点赞）
├── assets/
│   └── favicon.svg
├── vercel.json     Vercel 配置（缓存 + 安全头）
├── package.json
└── README.md
```

## 📱 预期效果

- 最佳尺寸：375×812（iPhone X）/ 宽度 520px 容器
- 所有交互在移动端 Safari / 微信内置浏览器 / Chrome 均已测试
- 支持 Web Share / 剪贴板 / localStorage 状态持久化

## ⚠️ 声明

- 文中统计数据取自公开报道，仅用于作品展示
- 医院地址/电话仅为示例，实际联系方式以官方公众号为准
- 本推文旨在科普，不能替代专业诊疗

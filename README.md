# PedalRig

吉他效果器内容站 — 帮吉他手了解效果器类型、对比型号、规划信号链顺序、搭建自己的踏板。

🔗 线上：[pedalrig.com](https://pedalrig.com)

## 技术栈

Next.js 16（App Router）· TypeScript · Tailwind CSS 4 · shadcn/ui · dnd-kit（拖拽规划器）· 部署于 Vercel

## 项目结构

```
src/
  app/          页面路由（App Router）
  components/   可复用组件
  data/         静态数据（JSON）
  lib/          工具函数与单一数据源
public/         静态资源
scripts/        运维脚本（IndexNow 等）
```

## 核心数据

| 文件 | 内容 |
| --- | --- |
| `src/data/pedals.json` | 67 款效果器 |
| `src/data/famous-boards.json` | 23 位名人踏板配置 |
| `src/data/vs-pairs.json` | 25 组对比页数据 |
| `src/data/pedal-types.json` | 效果器类型分类 |
| `src/data/brands.json` | 品牌数据（含富字段：intro/highlights/history/faqs） |

> 约定：不修改 `src/data/*.json` 已有数据的**结构**，只追加。

## 主要页面

- `/` 首页
- `/[typeSlug]`、`/types` 效果器类型
- `/best/[type]` "Best X Pedals" 着陆页（16 个类型）
- `/brands/[slug]` 品牌页（数据驱动动态路由）
- `/pedal-order` 信号链顺序指南（速查表 + 逐位置讲解 + FAQ）
- `/pedalboard/builder` 踏板规划器（拖拽排列、电源核算）
- `/compare`、`/vs/[slug]` 效果器对比
- `/famous/[slug]` 名人踏板
- `/pedals/[slug]` 单品页

## 开发

```bash
npm install
npm run dev     # 本地开发
npm run build   # 构建
npm run lint    # 代码检查
```

## SEO / 联盟

- 每个页面通过 `generateMetadata()` 输出 SEO 元数据。
- Amazon 联盟链接格式：`https://www.amazon.com/dp/{ASIN}?tag=pedalrig-20`；所有联盟出站链接标 `rel="...sponsored"`。
- 内容更新后用 IndexNow 主动通知搜索引擎：`node scripts/indexnow.mjs [urls...]`。

## 最近更新

### 2026-06-22 — 联盟链接合规与变现
- 全站 Amazon 联盟链接补齐 `rel="sponsored"` 合规（共 21 处）。
- 13 款高意图/高客单价产品由搜索页链接改为商品详情页（`/dp/{ASIN}`），缩短转化路径；ASIN 逐个核实为标准款。
- `/pedal-order` 新增效果器摆位 FAQ（wah / compressor / EQ / chorus / looper / noise gate）。

### 2026-06-15 — harvest 驱动的 on-page 优化
- `/pedal-order` 新增信号链顺序速查表（Chain Order Chart）。
- 围绕已验证的强项关键词强化 planner / signal-chain / Boss 相关页面文案与内链。

### 2026-06-11 — 品牌页与目录扩充
- `/brands/[slug]` 重构为数据驱动动态路由，旧 URL 301 重定向。
- 效果器目录扩充至 67 款，解锁 4 个 `/best/[type]` 与 2 个型号页。
- 接入 IndexNow（提交脚本 + public key）。

### 2026-06-10 — Best 着陆页
- 新增 `/best/[type]` "Best X Pedals" 动态着陆页，解决与类型页的关键词内耗。

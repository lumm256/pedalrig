# PedalRig

吉他效果器内容站。Next.js 15 App Router + TypeScript + Tailwind。部署在 Vercel。

## 项目结构

- `src/app/` — 页面路由
- `src/components/` — 组件
- `src/data/` — 静态数据（pedals.json, famous-boards.json, vs-pairs.json 等）
- `src/lib/` — 工具函数
- `public/` — 静态资源

## 关键数据文件

- `src/data/pedals.json` — 61 款效果器数据
- `src/data/famous-boards.json` — 23 位名人踏板配置
- `src/data/vs-pairs.json` — 25 组对比页数据
- `src/data/pedal-types.json` — 效果器类型分类
- `src/data/brands.json` — 品牌数据

## 开发命令

```bash
npm run dev    # 本地开发
npm run build  # 构建
```

## 注意事项

- 不要修改 `src/data/*.json` 里已有数据的结构，只能追加
- Amazon 联盟链接格式：`https://www.amazon.com/dp/{ASIN}?tag=pedalrig-20`
- 页面 SEO：每个页面需要 `generateMetadata()` 函数

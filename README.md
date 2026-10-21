# OpenRoboto 运营方指南

面向运营方的中英双语文档站，用 [VitePress](https://vitepress.dev) 构建。中文在根路径，英文在 `/en/`。

## 本地运行

需要 Node.js 18 以上。

```bash
npm install
npm run dev       # 本地预览，默认 http://localhost:5173
npm run build     # 构建静态文件到 docs/.vitepress/dist
npm run preview   # 预览构建结果
```

## 目录

```
docs/
├── .vitepress/config.mts     站点配置：导航、侧边栏、语言、搜索
├── public/                   原样复制的静态文件（图片、favicon、CNAME）
│   └── images/upload/        上传 SOP 用到的 App 截图
├── index.md                  中文首页
├── guide/overview.md         这份指南怎么用
├── before/                   一、成为运营方之前
│   ├── requirements.md       要求、收益与注意事项
│   ├── scenes.md             什么样的场景可以做、要准备多少
│   └── payment.md            收入怎么算（只写方法，不写单价）
├── after/                    二、成为运营方之后
│   ├── before-devices.md     收到设备前
│   ├── receiving-devices.md  收到设备时（验收、首次配置、试传）
│   ├── daily-operations.md   日常运营（录制规范、轮换、检查清单）
│   ├── upload.md             数据上传 SOP
│   ├── acceptance.md         验收与结算
│   └── troubleshooting.md    异常处理
├── business/                 三、商务拓展
│   ├── negotiation.md        和门店谈合作
│   ├── referral.md           推荐网络与推荐计划（数字留空）
│   └── templates/            协议模板
└── en/                       英文版，结构和中文完全一致
```

## 修改内容

- **中英文要同步改。** 每个中文页面在 `docs/en/` 下都有同路径的英文页面
- **新增页面：** 在中英文目录各建一个 `.md`，再在 `config.mts` 的 `zhSidebar` 和 `enSidebar` 里各加一项
- **页内跳转锚点**用的是自定义英文 ID，如 `## 带宽估算 {#bandwidth}`。改标题时保留 `{#...}`，中英文用同一个 ID
- **图片**放在 `docs/public/images/`，在 Markdown 里用 `/images/...` 引用，部署到子路径时会自动加前缀
- 构建时会检查死链，`npm run build` 通过再提交

## 部署

线上地址：<https://shift.openroboto.ai/operator-docs/>，要密码。

- 站点是 Vercel 项目 `operator-docs`（team `kevinkk2050-s-team`），生产域名 `operator-docs.vercel.app`。shift 项目把 `/operator-docs/*` rewrite 过来，所以构建时 `base` 是 `/operator-docs/`，产物放在 `dist/operator-docs/`（见 `vercel.json`）。
- 密码由 `middleware.ts` 做 HTTP Basic Auth：用户名随便填，密码是 Vercel 环境变量 `DOCS_PASSWORD`。没设密码时整站拒绝访问。
- 全站带 `X-Robots-Tag: noindex`，不进搜索引擎。

### 更新内容

```bash
vercel deploy --prod --scope kevinkk2050-s-team
```

### 改密码

```bash
vercel env rm DOCS_PASSWORD production --scope kevinkk2050-s-team
vercel env add DOCS_PASSWORD production --scope kevinkk2050-s-team   # 只用 ASCII 字符
vercel deploy --prod --scope kevinkk2050-s-team                      # 重新部署才生效
```

## 待定事项

- `business/referral.md`：推荐计划的所有数字留空，定稿后填上，并去掉"草案"提示
- 协议模板上线前请律师审核

## 内容来源

设备操作和上传部分整理自 GI Labs 官方 SOP。官方文档更新时，同步更新 `after/receiving-devices.md`、`after/upload.md` 和 `after/troubleshooting.md`（中英文各一份）。

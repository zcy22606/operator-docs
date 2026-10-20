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

站点是纯静态文件（`docs/.vitepress/dist`），任何静态托管都能用。不依赖 Google 字体等境外资源，搜索也是本地的。

### 方案一：GitHub Pages（最快）

1. 把这个文件夹推到一个 GitHub 仓库
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**
3. 推送到 `main` 分支，`.github/workflows/deploy.yml` 会自动构建发布
4. 访问 `https://<组织名>.github.io/<仓库名>/`

工作流默认把 `DOCS_BASE` 设为 `/<仓库名>/`。

### 方案二：绑定自己的域名

建议用子域名，例如 `docs.openroboto.ai`。

1. 新建 `docs/public/CNAME`，内容只有一行域名，如 `docs.openroboto.ai`
2. 在仓库 Settings → Secrets and variables → Actions → Variables 里新建变量 `DOCS_BASE`，值为 `/`
3. DNS 加一条 CNAME 记录，指向 `<组织名>.github.io`
4. 仓库 Settings → Pages 里填上域名，勾选 Enforce HTTPS

### 国内访问

`github.io` 在中国大陆访问不稳定。要保证国内外都能打开，常见做法是：

| 做法 | 说明 |
|---|---|
| 国内单独部署一份 | 把 `dist` 上传到阿里云 OSS、腾讯云 COS 等对象存储，开静态网站托管，前面加国内 CDN。**域名需要 ICP 备案** |
| 海外用 GitHub Pages / Cloudflare Pages / Vercel | 照上面的方案部署 |
| DNS 分区解析 | 同一个域名，国内解析到国内 CDN，海外解析到海外托管 |
| 暂时没有备案 | 可以先用香港节点的服务器或 CDN，不需要备案，国内访问速度一般但比 github.io 稳定 |

构建一次，同一份 `dist` 可以同时传到两边。

## 待定事项

- `business/referral.md`：推荐计划的所有数字留空，定稿后填上，并去掉"草案"提示
- 协议模板上线前请律师审核

## 内容来源

设备操作和上传部分整理自 GI Labs 官方 SOP。官方文档更新时，同步更新 `after/receiving-devices.md`、`after/upload.md` 和 `after/troubleshooting.md`（中英文各一份）。

# 数据上传 SOP

数据加密上传到 GI Labs 供应商后台。本页是运营方版本的操作步骤，完整说明以 GI Labs 官方文档为准：[EGO1 使用文档](https://docs.gilabs.xyz/zh-Hans/docs/ego1)。

## 上传方式

| 方式 | 适合 |
|---|---|
| 后台网页上传 | 数据量小，偶尔传一次 |
| `gi-ingest` 命令行 | Mac / Linux，每天大量上传，可以挂机过夜 |
| GI Ingest 桌面程序 | Windows 10/11，不想用命令行 |

选最方便的一种就行。云端上传（设备自己上传）目前还不支持，支持后会另行通知。

不管用哪种方式，都要先确认 [上传带宽](#bandwidth) 够用。

## 要准备的

| 东西 | 说明 |
|---|---|
| 上传子账号 | 由 OpenRoboto 开通，用它登录 GI Labs 供应商后台 |
| 上传令牌 | 用命令行或桌面程序时需要，在后台 `Upload tokens` 里生成。**只显示一次，当场保存** |
| 电脑 | Mac、Linux 或 Windows 10/11 |
| 硬盘空间 | 电脑或移动硬盘，装得下一轮的卡 |
| SD 卡 | 每台设备两张，轮流用 |

## 每天的流程

1. **收工：** 停止录制，拔出 SD 卡，换上另一张
2. **拷卡：** 把卡里的内容拷到电脑或移动硬盘。每段录制的文件夹要保持完整，里面的分段文件和 `session.json` 放在一起，不要拆开、改名或删文件
3. **上传：** 按你选的方式上传，可以开着电脑过夜
4. **确认：** 第二天确认后台已经收到，再清理电脑里的副本和 SD 卡
5. **回卡：** 把清空的卡插回设备

## 用 Windows 桌面程序上传 {#windows}

Windows 10/11 的电脑可以用 GI Ingest 桌面程序，不用敲命令。

1. **安装：** 登录 [GI Labs 供应商后台](https://vendor.gilabs.xyz)，在后台下载 Windows 安装包
2. **登录：** 在后台 `Upload tokens` 里生成上传令牌，填进程序登录
3. **选文件夹：** 选中拷好的录制文件夹（可以是一张卡拷出来的整个文件夹）
4. **回答问题：** 设备没扫码或当天没连手机的录制，程序会问"谁录的、在哪录的"或"哪天录的"，按实际情况回答，见 [上传时会被问的问题](#questions)
5. **开始上传：** 可以挂机过夜，上传过程中不要拔硬盘
6. **确认后清理：** 第二天在后台 `Deliveries` 页确认收到，再清理电脑里的副本和 SD 卡

程序里的具体按钮和选项，以 GI Labs 提供的说明为准。下面"规矩"一节同样适用。

## 用 gi-ingest 命令行上传 {#cli}

Mac、Linux 用这个方式。

### 安装（每台电脑一次）

```bash
# uv 会自己下载 Python，不需要先装其他东西
curl -LsSf https://astral.sh/uv/install.sh | sh
# 重新打开终端，让 uv 生效

uv tool install gi-ingest
gi-ingest --version
```

### 登录和自检

在后台 `Upload tokens` 页生成令牌。后台会直接显示一条带着令牌的完整命令，复制运行：

```bash
gi-ingest login --api-key gik_...
gi-ingest doctor
gi-ingest destinations --select   # 只有一个以上上传目的地时才需要
```

`doctor` 会检查工具版本、令牌和上传目的地。**每次开始前运行一次**，不要等到半夜才发现问题。

工具要保持最新，旧版本会被拒绝：

```bash
uv tool install --upgrade gi-ingest
```

### 上传

可以给一个或多个文件夹，工具会自己往下找：

```bash
gi-ingest upload /Volumes/SSD1/recordings --jobs 4 --max-bandwidth 50M
```

- `--jobs`：同时处理几段录制，默认 4
- `--max-bandwidth`：总带宽上限，`50M` 即每秒 50 MiB。店里白天还要用网的话，可以调低

### 上传时会被问的问题 {#questions}

这是正常流程，不是报错：

| 它问 | 原因 | 怎么办 |
|---|---|---|
| *Who recorded this, and where*（谁录的，在哪录的） | 设备没扫码，录制里没有门店和操作员 | 按列表编号回答，可以成组回答（`1,3-5` 或 `all`） |
| *What date was this collected*（是哪天录的） | 设备当天没连手机，时间是 1970 年 | 每段填 `YYYY-MM-DD` 格式的真实日期，或输入 `skip` 以后再处理 |

没有门店和操作员信息的录制不会被上传。日期是一段一段问的，不会自动套用到别的录制。

### 想挂机过夜，又怕中途被问

先把问题答完，再挂机上传：

```bash
gi-ingest attribute /Volumes/SSD1/recordings   # 先补信息
gi-ingest upload /Volumes/SSD1/recordings      # 再上传
```

### 查看进度

```bash
gi-ingest status     # 还有什么没传完：就绪、传输中、失败
gi-ingest history    # 已完成的交付
gi-ingest retry      # 重新上传失败的
```

后台的 `Deliveries` 页也能看到同样的信息和实时进度。

### 确认后再清理

```bash
gi-ingest reclaim /Volumes/SSD1/recordings --dry-run   # 先预览会删什么
gi-ingest reclaim /Volumes/SSD1/recordings             # 再正式清理
```

`reclaim` 只删后台已经确认收到、并且内容没变过的录制。没确认的、改动过的、文件夹里有其他文件的，都会保留。要同时清理 SD 卡，把卡的路径也一起给它。

## 规矩

- **拷完再传**，传完之前不要拔硬盘，卡先别删
- **不要直接格式化 SD 卡。** 后台确认收到之前，不要删任何文件。用命令行的话，用 `reclaim` 清理
- **上传报错不等于全部失败。** 看清楚哪些没传上，补完再传，**不要删原文件**
- **断网、死机，重新运行同一条命令即可**，已经传过的会自动跳过
- **一台电脑同一时间只运行一个上传程序**，要加快就调 `--jobs`
- **上传工具保持最新版本**
- 本地记录文件 `~/.local/state/gi-ingest/ledger.db` 不要删。删了数据不会丢，但 `reclaim` 将无法确认哪些已经交付，就不会再帮你清理

## 上传带宽 {#bandwidth}

**每台设备至少需要 3 MB/s 的上传带宽。** 一台设备录满一天约 110 GB，按 3 MB/s 算，晚上 10 小时刚好传完。

| 同时上传的设备 | 至少需要的上传速度 | 约合宽带标称 |
|---|---|---|
| 1 台 | 3 MB/s | 约 24 Mbps |
| 5 台 | 15 MB/s | 约 120 Mbps |
| 10 台 | 30 MB/s | 约 240 Mbps |

- 宽带一般按 Mbps 标，1 MB/s 约等于 8 Mbps
- 看的是**上行**速度。很多家用宽带下行很快，上行只有几十兆，办之前问清楚
- 上行不够的店，可以把卡集中到一个网络好的地方统一上传

# 收到设备时

设备到手当天做三件事：验收、首次配置、试传。全部做完，这台设备才算可以上岗。

详细操作以 GI Labs 官方文档为准：[EGO1 使用文档](https://docs.gilabs.xyz/zh-Hans/docs/ego1)。App 里的按钮和菜单按英文原样写出，方便对照。

## 第一步：验收

开箱后当场检查，有问题当天告诉对接人。

| 检查项 | 怎么看 |
|---|---|
| 数量 | 和发货单一致 |
| 外观 | 镜头无划痕，外壳无破损，接口正常 |
| 配件 | 线材、头带等齐全 |
| 能开机 | 插卡开机，指示正常 |
| 序列号 | 每台记下来，后面配置、交接、报故障都要用 |

确认无误后，签 [设备交接单](/business/templates/device-handover)，一份交给对接人，一份自己留存。

## 第二步：首次配置（每台一次）

### 1. 先插 SD 卡，再开机

设备在开机时识别 SD 卡。开机后才插的卡，要重启才能识别，App 会提示 *No SD card in the device*。

SD 卡出厂已格式化，**不要自己格式化**。

### 2. 配对手机

打开 Visio Companion → `Devices` → `+`（`Add device`）。还没装 App 的，见 [手机装好 Visio Companion](/after/before-devices#app)。

![Companion 设备列表](/images/upload/devices-list.png){width=300}

App 会同时用三种方式找设备，哪种能连上用哪种：

| 方式 | 适用情况 |
|---|---|
| USB | 设备用线连着手机，最稳定。安卓弹出相机权限要允许，App 不会用你手机的摄像头 |
| `On this Wi-Fi` | 设备已配过 Wi-Fi，和手机在同一网络 |
| `Nearby setup hotspots` | 新设备会发出 `GILABS-*` 热点，点它自动加入 |

配对后，设备会一直留在这部手机的设备列表里。

### 3. 检查设备状态

![设备页](/images/upload/device-page.png){width=300}

| 面板 | 看什么 |
|---|---|
| `Identity` | 记下 `Serial`（序列号） |
| `Build` | 固件版本。有新版就运行 `Firmware Upgrade`，**不要在采集当天升级** |
| `Disk` | 剩余空间充足 |
| `Recording` | 显示 `Idle` |

### 4. 设置分辨率：1728×1200

`Device settings` → `Camera resolution` → `1728×1200`，然后**重启设备**。

重启后再进 `Device settings` → `Camera resolution`，确认还是 1728×1200。

![设备设置](/images/upload/device-settings.png){width=300}

::: warning 没有 1728×1200 这个选项
联系对接人，不要选相近的数值。有些设备的传感器不支持这个分辨率，选别的数值不能代替。
:::

### 5. 打开手部检测

`Device settings` → `Hand detection` → `Detect hands in view`

![手部检测](/images/upload/hand-detection.png){width=300}

打开后，手离开画面时设备会语音提醒。

- 录制中打开，要等这段录制结束才生效
- 开关自己弹回关闭，说明设备启动不了这个功能。先查固件版本，不要反复开关

### 6. 云端上传保持关闭

目前还不支持云端上传，支持后会另行通知。

### 7. 扫门店二维码

二维码由对接人生成，每个"门店 × 操作员"组合一张，码下面印着人名和店名。可以打印贴在店里，也可以存在手机相册里。

在连着设备的手机上，打开这台设备的设备页，按下面三步操作：

| ① 点右上角扫码图标 | ② 扫码，或从相册选图 | ③ 核对后点 `Apply to device` |
|:---:|:---:|:---:|
| ![](/images/upload/scan-1.png){width=200} | ![](/images/upload/scan-2.png){width=200} | ![](/images/upload/scan-3.png){width=200} |

扫码图标在设备页右上角，齿轮旁边。确认页上要核对这四行：

| 行 | 应该显示 |
|---|---|
| `Location` | 店名 |
| `Location ID` | `env_` 开头的编号 |
| `Capturer` | 操作员姓名 |
| `Capturer ID` | `operator_` 开头的编号 |

- **两个 ID 行缺一个就停下**，先更新 Visio Companion 再扫；还不行联系对接人
- `Task` 和 `Message` 显示 *(cleared)* 是正常的
- 新的设置从下一段录制开始生效

### 8. 除了上面这些，不要改其他设置

## 第三步：试传

每台设备第一次上岗前做一次：

1. 录 10 秒
2. 按 [数据上传 SOP](/after/upload) 单独上传一次
3. 上传时**没有**被问"这段是谁录的"，就说明配置成功

被问了，说明编号没写进录制。回到第 7 步重扫，并看清两个 ID 行。还不行，升级固件后再试，或联系对接人。

花 10 分钟试传，比之后每段录制都要手动补信息省事得多。

## 上岗前最后确认

- [ ] 交接单已签
- [ ] 序列号已记录
- [ ] 分辨率 1728×1200，重启后确认过
- [ ] 手部检测已打开
- [ ] 已扫对应的门店二维码，两个 ID 行都有
- [ ] 试传成功，没被问"谁录的"
- [ ] 充电宝、两张 SD 卡已配好编号

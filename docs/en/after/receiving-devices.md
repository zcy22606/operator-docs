# When the devices arrive

On the day the devices arrive, do three things: check them, set them up, and run a test upload. A device is ready for work only once all three are done.

For the full details, the GI Labs documentation is the reference: [EGO1 documentation](https://docs.gilabs.xyz/docs/ego1).

## Step 1: Check the delivery

Check everything when you unpack. Report any problem to your contact the same day.

| Check | What to look for |
|---|---|
| Quantity | Matches the delivery note |
| Condition | No scratches on the lenses, no cracks in the housing, ports intact |
| Accessories | Cables, head strap and so on all present |
| Powers on | Insert a card and power on; it starts normally |
| Serial number | Write down each one. You'll need it for setup, handover and fault reports |

Once everything checks out, sign the [device handover form](/en/business/templates/device-handover). One copy goes to your contact, one stays with you.

## Step 2: First-time setup (once per device)

### 1. Insert the SD card, then power on

The device detects the SD card at power-on. A card inserted afterwards isn't seen until the next restart, and the app shows *No SD card in the device*.

SD cards come formatted. **Don't format them yourself.**

### 2. Pair your phone

Open Visio Companion → `Devices` → `+` (`Add device`). If the app isn't installed yet, see [Install Visio Companion](/en/after/before-devices#app).

![Companion device list](/images/upload/devices-list.png){width=300}

The app searches three ways at once and uses whichever finds the device:

| Method | When it works |
|---|---|
| USB | Device connected to the phone by cable. The most reliable. On Android, allow the camera permission when asked; the app doesn't use your phone's camera |
| `On this Wi-Fi` | The device already has Wi-Fi set up and is on the same network as the phone |
| `Nearby setup hotspots` | New devices broadcast a `GILABS-*` hotspot. Tap it and the app joins automatically |

Once paired, the device stays in this phone's device list.

### 3. Check the device status

![Device page](/images/upload/device-page.png){width=300}

| Panel | What to check |
|---|---|
| `Identity` | Write down the `Serial` |
| `Build` | Firmware version. If there's an update, run `Firmware Upgrade`. **Never upgrade on a recording day** |
| `Disk` | Plenty of free space |
| `Recording` | Shows `Idle` |

### 4. Set the resolution to 1728×1200

`Device settings` → `Camera resolution` → `1728×1200`, then **restart the device**.

After the restart, go back to `Device settings` → `Camera resolution` and confirm it still shows 1728×1200.

![Device settings](/images/upload/device-settings.png){width=300}

::: warning 1728×1200 isn't in the list
Tell your OpenRoboto contact. Don't pick a nearby value. Some sensors don't support this resolution, and another value is not a substitute.
:::

### 5. Turn on hand detection

`Device settings` → `Hand detection` → `Detect hands in view`

![Hand detection](/images/upload/hand-detection.png){width=300}

Once on, the device gives a voice alert when the worker's hands leave the frame.

- Turned on mid-recording, it takes effect only after that recording ends
- If the switch flips back to off by itself, the device couldn't start the feature. Check the firmware version; don't keep toggling it

### 6. Leave cloud upload off

Cloud upload isn't supported yet. We'll let you know when it is.

### 7. Scan the site QR code

Your contact generates the QR codes, one per site × worker pair, with the worker's name and site name printed underneath. Print them and post them at the site, or save them to your phone's photo album.

On the phone connected to the device, open that device's page and follow these three steps:

| ① Tap the scan icon, top right | ② Scan, or pick from the album | ③ Check, then tap `Apply to device` |
|:---:|:---:|:---:|
| ![](/images/upload/scan-1.png){width=200} | ![](/images/upload/scan-2.png){width=200} | ![](/images/upload/scan-3.png){width=200} |

The scan icon is at the top right of the device page, next to the gear. On the confirmation screen, check these four rows:

| Row | Should show |
|---|---|
| `Location` | Site name |
| `Location ID` | An ID starting with `env_` |
| `Capturer` | Worker's name |
| `Capturer ID` | An ID starting with `operator_` |

- **If either ID row is missing, stop.** Update Visio Companion and scan again; if that doesn't fix it, tell your OpenRoboto contact
- `Task` and `Message` showing *(cleared)* is normal
- New settings apply from the next recording

### 8. Leave every other setting alone

## Step 3: Test upload

Do this once for each device before it goes into service:

1. Record 10 seconds
2. Upload it on its own, following the [Data upload SOP](/en/after/upload)
3. If the upload **doesn't** ask who recorded it, setup worked

If it does ask, the IDs didn't make it into the recording. Go back to step 7, scan again and check both ID rows. If that doesn't work, upgrade the firmware and try again, or ask your OpenRoboto contact.

Ten minutes on a test upload saves you filling in details by hand for every recording later.

## Final check before going live

- [ ] Handover form signed
- [ ] Serial number recorded
- [ ] Resolution 1728×1200, confirmed after restart
- [ ] Hand detection on
- [ ] Site QR code scanned, both ID rows present
- [ ] Test upload passed without being asked who recorded it
- [ ] Power bank and two SD cards numbered and paired

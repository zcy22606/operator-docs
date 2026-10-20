# Troubleshooting

## Device

| Problem | What to do |
|---|---|
| Device doesn't appear in `Add device` | Make sure it's powered on. Over USB, allow the camera permission on Android. Over Wi-Fi, the phone and device must be on the same network. A device that has never had Wi-Fi set up only appears under `Nearby setup hotspots` |
| Device says there's no SD card | The card went in after power-on. Restart the device. If that doesn't help, contact your OpenRoboto contact |
| 1728×1200 not in the resolution list | Contact your OpenRoboto contact. Don't pick a nearby value |
| Resolution change has no effect | It only applies after a restart |
| Hand detection switches itself off | The device can't start the feature. Check and upgrade the firmware |
| Recordings dated 1970 | The phone wasn't connected that day. Connect it at the start of every day |
| Device lost or damaged | Tell your contact the same day and follow your agreement and handover form |

## QR codes

| Problem | What to do |
|---|---|
| *This is not a Visio settings code* | Wrong code. Ask your contact to generate a new one |
| App says it needs a newer version | Update Visio Companion |
| No ID rows on the confirmation screen | The app is too old. Update and scan again |
| Upload asks "who recorded this" every time | The IDs aren't reaching the recordings. Scan again and check both ID rows; if that fails, upgrade the firmware |

## Upload

| Problem | What to do |
|---|---|
| Upload asks for the collection date | The phone wasn't connected that day. Enter the real date |
| Upload reports an error but some files went through | Normal. Fix what didn't go through and upload again. Don't delete originals |
| Upload interrupted | Run the same command again; anything already sent is skipped |
| Files moved to another drive | Run again with the new path; progress is kept |
| Some files won't clear | The portal hasn't confirmed them yet. They're kept on purpose; clear them after confirmation |
| Upload too slow | See [upload bandwidth](/en/after/upload#bandwidth): at least 3 MB/s per device. If needed, bring cards to a place with a better connection |

## On site

| Problem | What to do |
|---|---|
| Someone in frame inappropriately dressed | Stop recording immediately and tell your contact the same day |
| A worker no longer wants to wear the device | Respect that and have someone else wear it |
| The site suddenly stops recording | Pause, find out why, and tell your contact |
| Notice to change scene or move a device | Act quickly, and scan the new code afterwards |
| Lots of rejected hours in the review | Work through the [common rejection reasons](/en/after/acceptance#invalid-reasons); ask your contact if unsure |

## What to send your contact

- Device serial number (device page → `Identity` → `Serial`)
- Firmware version (device page → `Build`)
- The site and worker involved
- If you upload from the command line, run `gi-ingest doctor` first and send its output
- Screenshots wherever possible

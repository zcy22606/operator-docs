# Data upload SOP

Data is uploaded, encrypted, to the GI Labs vendor portal. This page is the operator's version of the steps. For the full reference, see the GI Labs documentation: [EGO1 documentation](https://docs.gilabs.xyz/docs/ego1).

## Upload options

| Option | Good for |
|---|---|
| Portal web upload | Small amounts, occasional uploads |
| `gi-ingest` command line | Mac / Linux; large daily uploads that can run overnight |
| GI Ingest desktop app | Windows 10/11, if you'd rather not use the command line |

Use whichever is easiest. Cloud upload (devices uploading on their own) isn't supported yet. We'll let you know when it is.

Whichever you use, first make sure your [upload bandwidth](#bandwidth) is enough.

## What you need

| Item | Details |
|---|---|
| Upload account | Set up by OpenRoboto; use it to sign in to the GI Labs vendor portal |
| Upload token | Needed for the command line or desktop app. Generate it under `Upload tokens` in the portal. **It's shown only once, so save it straight away** |
| Computer | Mac, Linux or Windows 10/11 |
| Disk space | Computer or external drive with room for one round of cards |
| SD cards | Two per device, swapped daily |

## Daily flow

1. **End of day:** stop recording, take out the SD card, put in the other one
2. **Copy:** copy the card to the computer or an external drive. Keep each recording folder intact: its segment files and `session.json` stay together. Don't split, rename or delete files
3. **Upload:** upload with your chosen option. It can run overnight
4. **Confirm:** the next day, confirm the portal has received it, then clear the copies and the SD card
5. **Return the card:** put the cleared card back in the device

## Uploading with the Windows desktop app {#windows}

On Windows 10/11 you can use the GI Ingest desktop app instead of the command line.

1. **Install:** sign in to the [GI Labs vendor portal](https://vendor.gilabs.xyz) and download the Windows installer there
2. **Sign in:** generate an upload token under `Upload tokens` in the portal and enter it in the app
3. **Choose a folder:** select the folder of copied recordings (for example everything copied from one card)
4. **Answer questions:** for recordings from a device that wasn't scanned, or wasn't connected to the phone that day, the app asks who recorded it and where, or what date it was recorded. Answer accordingly; see [Questions during upload](#questions)
5. **Upload:** it can run overnight. Don't unplug the drive while it runs
6. **Clean up after confirmation:** the next day, confirm receipt on the portal's `Deliveries` page, then clear the copies and the SD card

For the app's exact buttons and options, follow the instructions GI Labs provides. The rules section below applies here too.

## Uploading with gi-ingest {#cli}

For Mac and Linux.

### Install (once per computer)

```bash
# uv downloads Python for you; nothing else needed first
curl -LsSf https://astral.sh/uv/install.sh | sh
# Reopen the terminal so uv is on your path

uv tool install gi-ingest
gi-ingest --version
```

### Sign in and self-check

Generate a token on the portal's `Upload tokens` page. The portal shows a complete command with your token already in it. Copy and run it:

```bash
gi-ingest login --api-key gik_...
gi-ingest doctor
gi-ingest destinations --select   # only if you have more than one destination
```

`doctor` checks the tool version, the token and the upload destination. **Run it before every session**, not at 2 a.m. when something has already gone wrong.

Keep the tool up to date. Old versions are refused:

```bash
uv tool install --upgrade gi-ingest
```

### Upload

Give it one or more folders and it searches inside them:

```bash
gi-ingest upload /Volumes/SSD1/recordings --jobs 4 --max-bandwidth 50M
```

- `--jobs`: how many recordings to process at once, default 4
- `--max-bandwidth`: total bandwidth cap; `50M` means 50 MiB/s. Lower it if the site needs the connection during the day

### Questions during upload {#questions}

These are part of the normal flow, not errors:

| It asks | Why | What to do |
|---|---|---|
| *Who recorded this, and where* | The device wasn't scanned, so the recording has no site or worker | Answer by list number. You can answer in groups (`1,3-5` or `all`) |
| *What date was this collected* | The device wasn't connected to the phone that day, so its clock says 1970 | Enter the real date for each recording as `YYYY-MM-DD`, or `skip` to deal with it later |

Recordings without site and worker details aren't uploaded. Dates are asked one recording at a time and never carried over to others.

### Running overnight without being interrupted

Answer the questions first, then leave it to upload:

```bash
gi-ingest attribute /Volumes/SSD1/recordings   # fill in details first
gi-ingest upload /Volumes/SSD1/recordings      # then upload
```

### Checking progress

```bash
gi-ingest status     # what's still pending: ready, uploading, failed
gi-ingest history    # completed deliveries
gi-ingest retry      # re-queue failed items
```

The portal's `Deliveries` page shows the same information with live progress.

### Clean up only after confirmation

```bash
gi-ingest reclaim /Volumes/SSD1/recordings --dry-run   # preview what will be removed
gi-ingest reclaim /Volumes/SSD1/recordings             # then clean up
```

`reclaim` only removes recordings that the portal has confirmed and that haven't changed since. Anything unconfirmed, modified, or in a folder with unexpected files is kept. To clear the SD card too, give it the card's path as well.

## Rules

- **Copy everything before uploading.** Don't unplug the drive until the upload finishes, and don't wipe the card yet
- **Don't format SD cards.** Don't delete anything until the portal confirms receipt. On the command line, use `reclaim` to clean up
- **An upload error doesn't mean everything failed.** Check which items didn't go through, fix them and upload again. **Don't delete the originals**
- **After a network drop or crash, run the same command again.** Anything already sent is skipped
- **Run only one upload program per computer at a time.** To go faster, raise `--jobs`
- **Keep the upload tool up to date**
- Don't delete the local ledger file `~/.local/state/gi-ingest/ledger.db`. Nothing would be lost on the GI Labs side, but `reclaim` could no longer prove what was delivered and would refuse to clean anything up

## Upload bandwidth {#bandwidth}

**Each device needs at least 3 MB/s of upload bandwidth.** One device recording a full day produces about 110 GB; at 3 MB/s that uploads in about 10 hours overnight.

| Devices uploading at once | Minimum upload speed | Roughly, as broadband is advertised |
|---|---|---|
| 1 | 3 MB/s | about 24 Mbps |
| 5 | 15 MB/s | about 120 Mbps |
| 10 | 30 MB/s | about 240 Mbps |

- Broadband is usually sold in Mbps; 1 MB/s is about 8 Mbps
- It's the **upload** speed that matters. Many home plans have fast download but only a few dozen Mbps up, so ask before signing up
- If a site's connection is too slow, bring the cards to one place with a good connection and upload them together

# Galapanídides Atlas Viewer

A future standalone web companion for the research/game-production corpus.

## Scope

This tool is intentionally separate from `www.chimelisart.com` and must not modify the existing site.

It is designed to become an attachable research surface later, not a replacement for the artist's website.

## Planned views

- **Timeline** — source-page order and narrative events.
- **Entities** — figures, places, objects, forms, symbols and events.
- **World graph** — Galapanídides, Earth, parallel universes, portals and access constraints.
- **Evidence panel** — page/video timestamp and confidence for every assertion.
- **Visual corpus** — best frame for each spread/page.
- **Unity mapping** — source entity → world layer → asset → scene object.

## Trust model

Every record carries:

```text
source
page / spread
video timestamp
observation
confidence
canon status
adaptation status
```

The viewer must never silently convert an interpretation into canon.

## Future integration

When stable, this can be embedded or linked from the existing Chimelis Art site without changing the existing production pages. Integration is deliberately deferred.

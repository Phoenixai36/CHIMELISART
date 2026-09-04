# GALAPANÍDIDES — Video Corpus Rescan 01

Date: 2026-09-04
Status: visual multi-pass audit completed
Source priority: physical pencil edition / user-provided videos

## Corpus inspected

Five uploaded videos were materialized and inspected frame-by-frame at approximately 1 frame/second for a first visual pass, with additional candidate-frame inspection around text-heavy and illustration-heavy intervals.

- `01.46.02` — 35.03 s
- `01.47.51` — 72.79 s
- `01.49.14` — 73.26 s
- `01.50.31` — 70.87 s
- `01.51.04` — 48.60 s

Total video duration: approximately 5:00.6.

The five videos yield hundreds of sampled frames and collectively cover a substantial sequence of the physical book. The videos overlap/transition through pages, so frame count is not equivalent to page count.

## Findings: visual/world information

### 1. The book is not only a sequence of isolated portraits

Across the corpus, the drawings repeatedly combine faces/figures with surrounding structures. Several spreads read as complete visual environments rather than a single character portrait.

### 2. Recurring human / humanoid figures

Observed repeatedly:

- frontal female-presenting faces;
- paired or grouped faces;
- figures with unusually emphasized eyes;
- faces embedded in or surrounded by patterned/organic structures;
- at least one small standing human-scale figure used within a larger composition, useful as a potential scale anchor.

These are visual observations only. No character names or narrative identities are assigned.

### 3. Recurring organic / tubular forms

Multiple spreads show long curved, segmented or tubular structures around faces and figures. Some resemble tentacular/serpentine forms; others can also read as cables, roots, anatomy or architectural elements.

Do **not** canonize the interpretation yet. Preserve the ambiguity in the asset taxonomy.

### 4. Eyes are a strong recurring motif

Large isolated eyes, paired eyes and eyes incorporated into larger facial/organic compositions recur throughout the videos. This is strong enough to be tracked as a visual motif, but its narrative function is still unknown.

### 5. Geometric + organic combination

The corpus repeatedly juxtaposes:

- grids/checkered or patterned surfaces;
- circular/spiral structures;
- segmented forms;
- dense linework;
- organic faces/anatomy.

This supports the existing 2D/2.5D world strategy: geometry should not automatically be classified as architecture and organic forms should not automatically be classified as creatures.

### 6. Possible spatial/depth compositions

Some spreads contain narrow paths, corridor/stair-like compositions, large enclosing forms and small figures inside larger fields. These are especially valuable for the first world-building pass because they provide visual cues for scale and traversability.

### 7. Repeated spiral / circular structures

Circular and spiral forms appear in several different contexts. Track recurrence first; determine whether they are symbols, objects, structures or decorative motifs only after page-level correlation.

## Findings: text

Text is visibly present on many pages and is interleaved with the illustrations. Several sampled frames show full or near-full paragraphs.

However, the videos were recorded at approximately 848x474 and frequently contain:

- page curvature;
- hand occlusion;
- motion blur during page turns;
- glare/shadow;
- oblique camera angles;
- short dwell times on text pages.

Automated OCR on representative frames was not sufficiently reliable to justify transcribing the prose. **No text is promoted to canon from OCR in this pass.** This is an important negative result: inventing a transcription would contaminate the Atlas.

The text-heavy frames should therefore be revisited from the physical book (or higher-resolution straight-on scans/photos) for reliable transcription.

## Video-by-video visual index

### 01.46.02

Contains an early sequence of portrait/face compositions, dense organic linework and several text spreads. The sequence also exposes paired-page compositions where the drawing continues across the gutter.

### 01.47.51

Strong concentration of geometric/organic forms, multiple faces, patterned structures and several text pages. Later portions include a small human-scale figure within a larger environment-like composition.

### 01.49.14

Contains several text blocks separated by grouped portraits and increasingly complex multi-face compositions. Circular/spiral structures and dense enclosing forms become prominent.

### 01.50.31

Contains substantial prose pages as well as spreads with large organic forms, figures and repeated eye/face motifs. Several compositions suggest environments rather than portraits alone.

### 01.51.04

Contains dense symbolic/organic drawings, profile faces, paired figures and later highly detailed compositions. Text pages remain interleaved with the artwork.

## New Atlas entities/motifs to track

These are **working visual IDs, not canonical names**:

- `MOTIF_EYE_CLUSTER`
- `MOTIF_SPIRAL_CIRCLE`
- `FORM_TUBULAR_SEGMENTED`
- `FORM_PATTERN_GRID`
- `FIGURE_FACE_FRONTAL`
- `FIGURE_GROUPED_FACES`
- `FIGURE_SMALL_SCALE_ANCHOR`
- `SPACE_CORRIDOR_OR_PATH`
- `SPACE_ENCLOSING_ORGANIC_FIELD`
- `COMPOSITION_CROSS_GUTTER`

## Important negative findings

- No reliable character names extracted.
- No reliable place names extracted.
- No reliable prose transcription extracted.
- No claim about the exact plot chronology is made from the videos alone.
- No ambiguous drawing is being declared a creature, machine, portal, deity or technology.

## Next rescan

The next pass should be **page registration rather than more random frame sampling**:

1. detect each page/spread transition;
2. choose the sharpest frame for each spread;
3. deskew/crop the page;
4. run OCR only on stable text regions;
5. manually verify uncertain words against the physical book;
6. assign a stable `PAGE_ID`;
7. attach every figure/motif/location hypothesis to that `PAGE_ID`;
8. build chronology only from verified page order.

For the Unity world, the most valuable next extraction is the set of spreads containing environment-like compositions and the small scale-anchor figures. Those can become the first spatial prototypes without prematurely inventing lore.

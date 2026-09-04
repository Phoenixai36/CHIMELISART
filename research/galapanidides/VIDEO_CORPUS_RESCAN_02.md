# GALAPANÍDIDES — VIDEO CORPUS RESCAN 02

## Scope
Second-pass visual audit of the five uploaded videos treated as the complete available plot/illustration corpus. This pass deliberately searches for information missed by a first scan: text-bearing pages, recurring figures, environmental structures, spatial cues, relationships between spreads, and potential world-building/mechanical implications.

## Source inventory
Five MP4 uploads were materialized for frame-level analysis. Combined duration is approximately 4m59s at 848×474 source resolution.

## Method
- Uniform temporal sampling plus sharpness/edge-density ranking.
- Contact sheets at regular intervals across all five videos.
- Additional high-detail frame selection for visually dense pages.
- Separate pass for likely text-page frames.
- Findings below are observations from the recording, not canon claims.

## High-confidence observations from the rescanned corpus

### 1. Text is structurally interleaved with illustration
The videos contain multiple full or near-full text pages between illustrated spreads. Text is not merely captions over images; several pages are conventional prose blocks. This makes the narrative recoverable in principle, but the current video resolution, perspective, page curvature, hand occlusion and motion make reliable transcription from the recording alone unsafe.

### 2. Human/humanoid figures recur with deliberate variation
The corpus contains numerous frontal and three-quarter faces, paired faces, grouped faces, and at least one distinctly non-human/creature-like figure. Faces often function as compositional anchors surrounded by geometric or organic structures.

### 3. A full-body human figure appears inside a larger environmental composition
One spread visibly contains a standing human figure placed amid a large architectural/organic composition. This is important for world scale: figures are not always isolated portraits; they can serve as inhabitants/reference bodies inside environments.

### 4. Architecture and biology are repeatedly fused
Several spreads combine human anatomy with grids, buildings, corridors/perspective lines, shell-like or tubular forms, and branching structures. The corpus supports a world grammar in which architecture cannot safely be separated from organismic forms.

### 5. Recurrent motif families are stronger than individual symbols
Repeated visual families include:
- eyes / eye clusters;
- spiral or concentric forms;
- segmented/tubular forms;
- hair/tentacle-like curls;
- grids/checkerboards and perspective lattices;
- branching/cracked/root-like structures;
- circular/annular frames;
- densely repeated pattern fields.

These should become Atlas motif families, not automatically lore objects.

### 6. Perspective is an explicit visual device
Some spreads contain strong converging lines, tiled surfaces, architectural grids or tunnel/corridor-like composition. This suggests that depth can be reconstructed from the source rather than invented as a conventional 3D scene.

### 7. Multi-figure relationships are potentially narratively significant
Paired and grouped faces appear repeatedly. Because recurrence and ordering across spreads have not yet been normalized into page IDs, character identity and chronology remain unresolved. They must not yet be assigned names.

### 8. Creature/other-being possibility is visually present
At least one spread shows a heavily armored or monstrous/other-being-like figure, while other figures combine human faces with non-human surrounding anatomy. This is sufficient to create an Atlas category `FIGURE_NONHUMAN_OR_TRANSFORMED`, but not sufficient to assert species, faction or canonical identity.

### 9. The page gutter matters
Several illustrations clearly cross or visually negotiate the book gutter. For the game, a double-page spread should often be treated as one composition before deciding how to divide it into Unity layers.

### 10. Environment can be encoded as relationships, not isolated assets
The strongest world-building evidence is not a list of props. It is the repeated relationship between figure, enclosure, geometry, organic structure, pattern and perspective. Therefore the Unity representation should preserve relational composition.

## Text recovery status
The rescan confirms many text-bearing pages, including pages with long prose blocks. Some frames are good enough to identify line blocks but not to guarantee character-level transcription. The correct next stage is image rectification and targeted OCR on the sharpest frames/spreads, followed by human visual verification.

## Candidate Atlas entities
```text
FIGURE_HUMAN_FRONTAL
FIGURE_HUMAN_GROUP
FIGURE_FULL_BODY_SCALE_ANCHOR
FIGURE_NONHUMAN_OR_TRANSFORMED
MOTIF_EYE_SINGLE
MOTIF_EYE_CLUSTER
MOTIF_SPIRAL_CONCENTRIC
FORM_TUBULAR_SEGMENTED
FORM_CURL_TENTACLE_LIKE
FORM_BRANCH_ROOT_CRACK
GRID_CHECKER_PERSPECTIVE
SPACE_CORRIDOR_PERSPECTIVE
SPACE_ARCHITECTURAL_ENCLOSURE
FIELD_PATTERN_DENSE
FRAME_CIRCULAR_ANNULAR
COMPOSITION_CROSS_GUTTER
PAGE_TEXT_PROSE
```

## Design consequence
The previous `UMBRAL` concept should be treated as a rendering hypothesis, not as the whole world. The corpus now clearly justifies a richer environment vocabulary containing:

```text
inhabitant / figure
architecture / enclosure
organic structure
geometric field
perspective corridor
pattern field
symbolic focal element
text-bearing narrative page
```

## Next pass
1. Build a page/spread index across all five videos.
2. Select the sharpest frame for every distinct spread.
3. Rectify pages to reduce perspective and gutter distortion.
4. Run targeted OCR only on text-bearing frames.
5. Verify OCR visually against the original frame.
6. Track recurring figures across spreads before naming them.
7. Build a chronological/narrative graph from verified text plus image relations.
8. Update the Unity world grammar only after those relations are recorded.

## Evidence rule
Nothing in this document is canon merely because it appears visually plausible. It is a research layer derived from the recordings and remains subject to page-level verification.

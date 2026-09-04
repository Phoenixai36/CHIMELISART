# GALAPANÍDIDES — BUILD SEQUENCE

## Sequential execution order

### 01 — Source lock
- Physical pencil edition = primary visual source.
- Recorded pages = evidence corpus.
- Public gallery / color-3D edition = secondary context.
- Never promote an interpretation to canon without evidence.

### 02 — Atlas
- Index pages.
- Record recurring motifs.
- Record composition, line density, anatomy, geometry and spatial relationships.
- Give every observation a confidence/status tag.

### 03 — World grammar
- Define the visual primitives that can become environment layers.
- Define depth rules without introducing unsupported lore.
- Define what must remain visibly hand-drawn.

### 04 — Unity project scaffold
Target: Unity 6.x + URP + Universal 2D / 2D Renderer.
Create the reproducible folder and scene architecture before importing gameplay systems.

### 05 — Umbral world
Scene: `GALAPANIDIDES_UMBRAL_WORLD`

Hierarchy:
```text
GALAPANIDIDES_UMBRAL_WORLD
├── World
│   ├── PaperVoid
│   ├── DeepForms
│   ├── StructuralForms
│   ├── FigureAnchors
│   ├── ForegroundFragments
│   └── DimensionalField
├── Lighting
├── Camera
└── Presentation
```

### 06 — Depth
- Orthographic camera.
- Controlled parallax by layer.
- Selective mesh depth only where it improves the source composition.
- No generic 3D conversion.

### 07 — Lighting
- Sprite-Lit where useful.
- Light 2D for readable spatial separation.
- Shadow/normal information only when supported by the artwork.
- Avoid lighting that makes pencil art look like conventional fantasy concept art.

### 08 — Dimensional field
Implement a visual-only field first:
- subtle distortion;
- layer mismatch;
- masking;
- depth haze;
- controlled shader variation.
No portal mechanic yet.

### 09 — Presentation validation
The world must work as a still image and as a slowly traversable composition before gameplay is introduced.

Acceptance test:
> A screenshot should communicate a coherent parallel/alien environment without UI or gameplay explanation.

### 10 — Exploration
Only after the visual world passes validation:
- camera exploration;
- player presence;
- environmental interaction.

### 11 — Mechanics
Only after the environment and exploration are stable:
- dimensional interaction;
- puzzles;
- narrative systems;
- other gameplay.

## Current state

Prepared in GitHub:
- `ATLAS.md`
- `WORLD_RENDERING_PASS.md`
- `WORLD_ATLAS_OBSERVATIONS.md`
- `UNITY_UMBRAL_SCENE_SPEC.md`
- Unity runtime scaffold.

Not honestly claimable from this chat yet:
- Unity Editor execution.
- Successful Unity compilation.
- Rendered Game View screenshot.

Those require an accessible Unity project/editor workspace.

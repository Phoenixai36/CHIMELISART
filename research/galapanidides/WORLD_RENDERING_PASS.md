# GALAPANÍDIDES — World Rendering Pass

## Purpose

Build the world before gameplay mechanics. This pass converts the visual corpus of the physical pencil edition into a navigable Unity environment while deliberately avoiding combat, inventory, progression, quests, and other gameplay systems.

## Source hierarchy

1. Physical pencil edition: primary visual source.
2. Recorded page videos: observational corpus.
3. Tridimensionalidad/color edition: secondary reinterpretation, never automatic canon.
4. Interpretations in this document: hypotheses until confirmed by the book.

## Rendering principles

- Preserve the pencil language: line, density, negative space, asymmetry and hand-drawn irregularity.
- Do not turn every drawing into a conventional sprite.
- Use layered 2D/2.5D composition where depth is visually useful.
- Treat recurring motifs as world elements only after recurrence is observed.
- Avoid adding lore merely to fill empty space.
- The world should feel explorable before it feels game-like.

## First environment: UMBRAL

The first vertical world slice is an atmospheric dimensional threshold.

### Required visual layers

- Background field / paper-like spatial substrate.
- Large-scale pencil forms derived from observed compositions.
- Midground organic/geometric structures.
- Foreground silhouettes and partial occlusions.
- One or more anomalous visual concentrations suggesting a dimensional boundary.
- Camera framing that allows the composition to breathe rather than behaving like a platformer camera.

### Visual state

`WORLD_ONLY`

No interaction is required for the first render pass. A later pass may introduce a dimensional transition, but the initial scene must already work as a place to inhabit visually.

## Unity target

- Unity 6.x.
- Universal Render Pipeline.
- Universal 2D / 2D Renderer as the initial baseline.
- Orthographic camera with controlled parallax/depth layers.
- Input System may be present, but movement is not part of this pass.
- ScriptableObjects reserved for world/layer metadata once the first environment is validated.

## Scene concept

```text
Umbral
├── Environment
│   ├── Background
│   ├── DeepForms
│   ├── MidForms
│   ├── ForegroundForms
│   └── DimensionalField
├── Lighting
├── Camera
└── Presentation
```

## Acceptance criteria

1. The scene communicates a coherent place without gameplay UI.
2. The visual hierarchy remains legible at multiple camera distances.
3. Pencil-derived forms remain recognizable as source language rather than generic fantasy art.
4. Parallax/depth adds dimensionality without becoming a conventional 3D scene.
5. No gameplay mechanic is required to understand the scene.
6. The scene can later accept a dimensional transition without restructuring the world hierarchy.

## Explicitly deferred

- Combat.
- NPC AI.
- Inventory.
- Progression.
- Quests.
- Dialogue systems.
- Collectibles.
- Puzzle logic.
- Player abilities.

## Next evidence needed

The physical-page corpus should be indexed page-by-page before specific canonical entities, locations, symbols or mechanics are named. Each observation should record its page/video source and confidence level.

# GALAPANÍDIDES — UNITY UMBRAL SCENE SPEC v0.1

## Goal
Render the first inhabitable world before adding gameplay mechanics.

## Scene
`GALAPANIDIDES_UMBRAL_WORLD`

## Stack
- Unity 6.x
- Universal Render Pipeline
- Universal 2D / 2D Renderer
- Orthographic camera
- Sorting Layers for visual depth
- 2D lights only where they strengthen the source artwork

## Hierarchy
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

## Rendering rules
1. Pencil texture and irregular linework are primary visual signals.
2. Do not smooth away source irregularities merely to make assets game-like.
3. Use parallax sparingly; depth should emerge from layered composition.
4. Organic and geometric forms may occupy the same layer and should not be forced into separate semantic categories.
5. Avoid conventional fantasy props unless directly supported by the source corpus.
6. No UI in the initial scene.
7. No player avatar required for the first render.
8. No gameplay logic in the first render.

## Camera
Start with an orthographic camera. Frame the world as a large composition rather than a room. The camera should allow slow exploration later without requiring the world to be rebuilt.

## DimensionalField
Reserve a dedicated visual layer for later transitions. In the world-only pass it remains subtle: depth haze, mask boundaries, parallax mismatch, or local distortion may suggest that the visible composition is not the whole space. Do not implement a portal mechanic yet.

## Asset policy
The physical pencil edition is the primary artistic reference. The public Chimelis Art gallery is secondary context. The later color/3D edition is a reinterpretation and must not silently overwrite the pencil language.

## Acceptance test
A screenshot of the scene should read as a coherent alien/parallel environment without any gameplay explanation. If the screenshot only looks like a collection of disconnected drawings, the world-building pass has failed.

## Deferred systems
Player controls, interaction, portals, puzzles, combat, inventory, NPCs, quests, progression, save state.

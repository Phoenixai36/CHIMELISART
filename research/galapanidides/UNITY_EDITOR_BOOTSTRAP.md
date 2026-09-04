# Unity Editor Bootstrap — GALAPANÍDIDES

This file is the execution handoff for the first Unity Editor session.

## Project target

Unity 6.x, URP, Universal 2D / 2D Renderer.

Unity's current documentation supports a dedicated 2D Renderer, 2D Lights, Shader Graph workflows for 2D lighting, and Renderer Features. See:
- https://docs.unity3d.com/6000.0/Documentation/Manual/urp/2d-index.html
- https://docs.unity3d.com/6000.0/Documentation/Manual/urp/2DRendererData-overview.html

## Required scene

`Assets/Galapanidides/Scenes/GALAPANIDIDES_UMBRAL_WORLD.unity`

## Required hierarchy

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

## Required scripts

Attach the runtime world definition to `World` and the parallax rig to the camera/presentation layer according to the current runtime scaffold.

## Editor build order

1. Create/open the Unity 6.x project.
2. Confirm URP is active.
3. Confirm the 2D Renderer is assigned.
4. Create the scene and hierarchy above.
5. Create Sorting Layers matching the visual depth hierarchy.
6. Add the orthographic camera.
7. Add empty layer roots before importing art.
8. Import source-derived artwork without smoothing away pencil irregularities.
9. Place artwork into depth layers.
10. Add only minimal 2D lighting.
11. Add the dimensional field as a visual-only layer.
12. Save the scene.
13. Open Game View and capture a baseline screenshot.
14. Validate against `WORLD_RENDERING_PASS.md`.

## Do not add yet

- Player controller
- Combat
- NPC AI
- Inventory
- Quests
- Progression
- Puzzle logic
- Portal interaction
- Gameplay HUD

## Definition of done for the first Editor pass

A static Game View screenshot must read as one coherent world rather than a collection of disconnected illustrations.

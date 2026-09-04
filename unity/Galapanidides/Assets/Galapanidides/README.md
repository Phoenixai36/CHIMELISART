# Galapanídides — Unity World

## Current phase: WORLD ONLY

This directory is the Unity-side implementation scaffold for `GALAPANIDIDES_UMBRAL_WORLD`.

### Build order

1. Create/open a Unity 6.x project using the Universal 2D template.
2. Verify URP 2D Renderer is active.
3. Create scene `GALAPANIDIDES_UMBRAL_WORLD`.
4. Create the hierarchy:
   - `World/PaperVoid`
   - `World/DeepForms`
   - `World/StructuralForms`
   - `World/FigureAnchors`
   - `World/ForegroundFragments`
   - `World/DimensionalField`
   - `Lighting`
   - `Camera`
   - `Presentation`
5. Add the supplied `UmbralParallaxRig` to `Presentation` and assign the four visual layers.
6. Add source-derived artwork as layered content; do not invent canonical entities or props at this stage.
7. Tune composition, scale, parallax and lighting until the scene reads as one coherent place.

## Explicitly excluded

No player controller, combat, inventory, quests, progression, puzzle logic, NPC AI, portal mechanic or gameplay UI belongs in this phase.

## Source policy

The physical pencil edition is primary. The color/3D edition is secondary visual context. Interpretations must remain distinguishable from observations.

## Validation

The first acceptance artifact is a clean scene screenshot showing a coherent environment with no gameplay UI. A later pass may add camera movement and dimensional presentation after the static composition is approved.

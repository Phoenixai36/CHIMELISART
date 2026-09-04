# GALAPANÍDIDES — ATLAS ENTITY SCHEMA

## Purpose
Normalize evidence recovered from the complete video corpus before any lore, character identity or gameplay interpretation is promoted.

## Entity record

```yaml
id: stable_identifier
kind: FIGURE | PLACE | OBJECT | FORM | SYMBOL | TEXT | COMPOSITION | EVENT
status: OBSERVADO | TRANSCRITO | RELACIONADO | HIPÓTESIS | CANON_CONFIRMADO
source_video: filename
source_time_start: seconds
source_time_end: seconds
spread_id: provisional_or_verified
page_id: provisional_or_verified
visual_description: neutral_description
text_evidence: verified_text_or_null
recurrence_group: motif_or_character_group_or_null
spatial_role: BACKGROUND | STRUCTURE | ANCHOR | FOREGROUND | UNKNOWN
possible_relations: []
confidence: LOW | MEDIUM | HIGH
notes: []
```

## Rules
1. Identity is not assigned from facial similarity alone.
2. A recurring face is a candidate character only after recurrence is tracked across distinct spreads.
3. A recurring object/form is a motif before it is an in-world object.
4. A text transcription must be visually checked before becoming narrative evidence.
5. World locations require spatial evidence from composition, text or recurrence.
6. Mechanical implications remain separate from canon/lore evidence.

## Character tracking
Use `recurrence_group: FIGURE_CANDIDATE_###` until identity is verified.

## Place tracking
Use `PLACE_CANDIDATE_###` for recurring spatial compositions such as architectural interiors, corridors, fields or other enclosures.

## Text tracking
Use `TEXT_BLOCK_###` for each verified prose block. Keep page order and source timestamp.

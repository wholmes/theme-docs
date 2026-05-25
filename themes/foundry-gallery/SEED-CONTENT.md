# Foundry Gallery — fictional demo seed content

All demo copy is **invented** for layout and QA. It does not represent real artists, venues, press outlets, or external organizations.

**Source of truth (PHP):** `foundry-gallery/inc/seed-data.php`  
**Importer:** **Tools → Foundry Demo Content → Import demo content** (`inc/seed-content.php`)

Homepage section defaults and hero fallbacks read from the same catalog.

---

## Artists

| Name | Specialty | Tags |
|------|-----------|------|
| Maren Voigt | Watershed & Field Photography | watershed, field, documentary |
| Elias Thorn | Industrial Landscape | industrial, landscape |
| Nora Castell | Sculpture & Installation | sculpture, installation |
| Jun Park | Lens-Based Media | film, lens, experimental |
| Vera Ashford | Editions & Archive | editions, archive |

**Sample media (Maren Voigt only):**

- Video: *Studio Walkthrough: Project Room* — placeholder embed URL in catalog  
- Press: *The Foundry Review — Watershed Portfolio* — `https://foundryreview.foundrygallery.com/features/watershed-portfolio`

---

## Exhibitions

| Title | Artist | Dates | Venue | Status |
|-------|--------|-------|-------|--------|
| Signal From the River | Maren Voigt | Jan 15 – Mar 14, 2026 | Foundry Arts Pavilion, Milltown | Current |
| Steel Horizon | Elias Thorn | Feb 1 – Apr 20, 2026 | Foundry Gallery, Milltown | Current |
| Milltown Arts Exchange 2026 | — (The Foundry Gallery Room) | 12–16 Feb 2026 | Foundry District Expo Hall · Booth 4C | Current (art fair) |
| Winter Index | Jun Park | Nov 2025 – Jan 2026 | Foundry Gallery, Milltown | Past |
| Copper Light | Elias Thorn | Oct – Dec 2025 | Foundry Gallery, Milltown | Past |
| Surface Tension | Nora Castell | Sep 2025 | Foundry Gallery, Milltown | Past |

---

## Hero slides

| Title | Meta line |
|-------|-----------|
| Signal From the River | EXHIBITION \| Maren Voigt \| January 15 – March 14 |
| Steel Horizon | NEW WORK \| Elias Thorn \| Industrial Landscapes |
| Quiet Machinery | VIEWING ROOM \| Jun Park \| Lens-Based Media |
| Winter Index | FEATURED \| Moving Image \| Limited Screenings |

CTAs link to the matching exhibition, Artwork page, Viewing Room archive, or Contact.

---

## Artwork series

- **River Signal** (`river-signal`)
- **Furnace Row** (`furnace-row`)

## Featured works

- Furnace Row I (Maren Voigt)
- Tidal Panel II (Elias Thorn)
- Night Yard III (Jun Park)
- Cast Line IV (Nora Castell)

## Collection works (examples)

River Signal I–III, Furnace Row II–IV, Expo Study I–III (fair booth)

---

## Viewing rooms

1. Maren Voigt — Viewing Room  
2. Elias Thorn — Viewing Room  
3. Milltown Arts Exchange 2026  

---

## Journal

1. *Signal From the River: Opening Night* (news)  
2. *Why Lens-Based Work Belongs in the Mill* (essay)  
3. *Packing for the Arts Exchange* (behind-the-scenes)  

---

## Homepage (section builder defaults)

Default block order after import or **Rebuild homepage sections**: Statement → Featured works → Editorial → Video → Newsletter → Services. Reorder via **Pages → Home → Section builder** (drag rows, Update).

| Field | Fictional value |
|-------|-----------------|
| Statement quote | "When the foundry falls quiet, the river still writes its line across the valley." |
| Statement author | — Elias Thorn |
| Editorial category | Reading the Foundry District |
| Editorial title | Foundry Arts Pavilion, Milltown |
| Video title | Foundry Gallery \| Studio Walkthrough: Project Room |
| Services | Private client art advisory (generic copy) |

---

## Staff (fictional)

| Name | Role | Email |
|------|------|-------|
| Morgan Hale | Director | director@foundrygallery.com |
| Jordan Ellis | Curator | curator@foundrygallery.com |
| Sam Rivera | Operations | operations@foundrygallery.com |
| Alex Kim | Gallery Manager | gallery@foundrygallery.com |
| Taylor Brooks | Sales | sales@foundrygallery.com |
| Jamie Cole | Communications | press@foundrygallery.com |

---

## Locations (Milltown — fictional)

1. **Milltown · Foundry Gallery** — 220 Foundry Street, Unit 4  
2. **Milltown · Project Room** — 220 Foundry Street, Building C (by appointment)  
3. **Milltown · Editions Studio** — Building C, Suite 12 (by appointment)  

---

## Re-importing after title changes

The importer matches posts **by title**. If you previously imported real-name demo posts, new fictional titles will create **duplicate** posts. **Empty trash** (or permanently delete old demo posts), then run **Import demo content** again, and **Rebuild homepage sections**.

### Homepage featured works

Four artworks are flagged **Featured on homepage** during import:

- Furnace Row I  
- Tidal Panel II  
- Night Yard III  
- Cast Line IV  

The Featured Works section queries `is_featured` on the **Artwork** post type. Re-import always re-applies those flags. If the grid is empty after import, confirm **Artworks** exist under wp-admin and run **Import demo content** again (not homepage rebuild alone).

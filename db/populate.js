require("../utils/loadEnv");
const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS items, categories, assignments;  

  CREATE TABLE 
    items (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      sku CHAR(8)
        CONSTRAINT sku_format 
        CHECK (sku ~ '^[A-Z0-9]+$'),
      stock INTEGER,
      price NUMERIC(10, 2),
      name VARCHAR(64),
      brand VARCHAR(64),
      description VARCHAR(255)
    );

  CREATE TABLE 
    categories (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(32) UNIQUE NOT NULL
    );

  CREATE TABLE 
    assignments (
      item_id INTEGER,
      category_id INTEGER,
      PRIMARY KEY(item_id, category_id),
      CONSTRAINT fk_item
        FOREIGN KEY (item_id)
        REFERENCES items(id) 
        ON DELETE CASCADE,
      CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id) 
        ON DELETE CASCADE
    );

INSERT INTO categories (name) VALUES
  ('Painting'),
  ('Drawing'),
  ('Brushes'),
  ('Paper & Sketchbooks'),
  ('Markers & Pens'),
  ('Inks'),
  ('Canvases & Surfaces'),
  ('Accessories');

INSERT INTO items (sku, stock, price, name, brand, description) VALUES
  ('PNT00001', 25, 12.99, 'Titanium White Oil Paint 37ml', 'Winsor & Newton', 'Highly opaque, brilliant white oil color.'),
  ('PNT00002', 15, 14.50, 'Ivory Black Oil Paint 37ml', 'Winsor & Newton', 'Classic all-purpose black oil color.'),
  ('PNT00003', 20, 18.00, 'Cadmium Red Oil Paint 37ml', 'Winsor & Newton', 'Warm, bright red pigment.'),
  ('PNT00004', 18, 16.50, 'Ultramarine Blue Oil 37ml', 'Winsor & Newton', 'Deep and rich transparent blue.'),
  ('PNT00005', 12, 11.99, 'Yellow Ochre Oil Paint 37ml', 'Winsor & Newton', 'Natural earth yellow pigment.'),
  ('PNT00006', 30, 22.00, 'Viridian Green Oil Paint 37ml', 'Winsor & Newton', 'Transparent, cool blue-green.'),
  ('PNT00007', 14, 15.00, 'Burnt Sienna Oil Paint 37ml', 'Winsor & Newton', 'Rich, warm earth brown.'),
  ('PNT00008', 10, 19.50, 'Cobalt Blue Oil Paint 37ml', 'Winsor & Newton', 'Clean, vivid blue.'),
  ('PNT00009', 22, 13.50, 'Alizarin Crimson Oil 37ml', 'Winsor & Newton', 'Cool, transparent ruby red.'),
  ('PNT00010', 16, 17.99, 'Cerulean Blue Oil Paint 37ml', 'Winsor & Newton', 'Opaque, bright sky blue.'),
  ('ACR00011', 40, 8.99, 'Heavy Body Acrylic White 2oz', 'Liquitex', 'Thick, high pigment white acrylic.'),
  ('ACR00012', 35, 8.99, 'Heavy Body Acrylic Black 2oz', 'Liquitex', 'Thick, high pigment black acrylic.'),
  ('ACR00013', 30, 10.50, 'Heavy Body Primary Red 2oz', 'Liquitex', 'Vibrant primary red acrylic.'),
  ('ACR00014', 28, 10.50, 'Heavy Body Primary Blue 2oz', 'Liquitex', 'Vibrant primary blue acrylic.'),
  ('ACR00015', 33, 10.50, 'Heavy Body Primary Yellow 2oz', 'Liquitex', 'Vibrant primary yellow acrylic.'),
  ('ACR00016', 20, 11.00, 'Fluid Acrylic Teal 1oz', 'Golden', 'Highly liquid, intense teal pigment.'),
  ('ACR00017', 25, 11.00, 'Fluid Acrylic Magenta 1oz', 'Golden', 'Highly liquid, intense magenta.'),
  ('ACR00018', 15, 11.00, 'Fluid Acrylic Gold 1oz', 'Golden', 'Iridescent gold fluid acrylic.'),
  ('ACR00019', 45, 14.99, 'Acrylic Gesso Primer 16oz', 'Liquitex', 'Classic white surface prep for canvas.'),
  ('ACR00020', 20, 16.50, 'Gloss Medium & Varnish 8oz', 'Liquitex', 'Multipurpose gloss medium.'),
  ('WTC00021', 50, 6.50, 'Cotman Watercolor Lemon Hue', 'Winsor & Newton', 'Student grade half-pan watercolor.'),
  ('WTC00022', 45, 6.50, 'Cotman Watercolor Sap Green', 'Winsor & Newton', 'Student grade half-pan watercolor.'),
  ('WTC00023', 48, 6.50, 'Cotman Watercolor Indigo', 'Winsor & Newton', 'Student grade half-pan watercolor.'),
  ('WTC00024', 30, 14.00, 'Prof. Watercolor Rose Madder', 'Winsor & Newton', 'Professional grade tube 5ml.'),
  ('WTC00025', 25, 12.00, 'Prof. Watercolor Payne''s Gray', 'Winsor & Newton', 'Professional grade tube 5ml.'),
  ('WTC00026', 15, 24.99, 'Watercolor Pocket Set 12', 'Winsor & Newton', 'Compact travel set with 12 half pans.'),
  ('WTC00027', 10, 89.99, 'Professional Pan Set 24', 'Winsor & Newton', 'Studio set with 24 pro colors.'),
  ('WTC00028', 60, 5.00, 'Masking Fluid 30ml', 'Pebeo', 'Drawing gum for preserving white space.'),
  ('WTC00029', 20, 15.50, 'Ox Gall Liquid 75ml', 'Winsor & Newton', 'Wetting agent for watercolors.'),
  ('WTC00030', 40, 4.50, 'Sea Sponge Natural', 'Generic Art', 'Natural sponge for texture effects.'),
  ('BRS00031', 60, 7.50, 'Synthetic Round Brush Size 2', 'Princeton', 'Versatile round tip, snap and spring.'),
  ('BRS00032', 55, 9.00, 'Synthetic Round Brush Size 6', 'Princeton', 'Versatile round tip, mid-size.'),
  ('BRS00033', 45, 12.50, 'Synthetic Round Brush Size 10', 'Princeton', 'Large round tip for washes.'),
  ('BRS00034', 40, 11.00, 'Bristle Flat Brush Size 4', 'Rosemary & Co', 'Stiff hog bristle for oils.'),
  ('BRS00035', 35, 14.50, 'Bristle Flat Brush Size 8', 'Rosemary & Co', 'Wide stiff hog bristle.'),
  ('BRS00036', 30, 13.00, 'Filbert Brush Size 6', 'Da Vinci', 'Oval shaped tip, good for blending.'),
  ('BRS00037', 25, 45.00, 'Kolinsky Sable Round Size 4', 'Da Vinci', 'Premium natural hair for watercolors.'),
  ('BRS00038', 15, 85.00, 'Kolinsky Sable Round Size 8', 'Da Vinci', 'Premium natural hair, high capacity.'),
  ('BRS00039', 50, 18.00, 'Hake Wash Brush 2 inch', 'Yasutomo', 'Soft sheep hair for wide washes.'),
  ('BRS00040', 20, 22.50, 'Fan Brush Size 4', 'Princeton', 'Synthetic fan for grass and textures.'),
  ('PPR00041', 40, 18.99, 'Bristol Smooth Pad 9x12', 'Strathmore', 'Heavyweight paper for ink and markers.'),
  ('PPR00042', 35, 18.99, 'Bristol Vellum Pad 9x12', 'Strathmore', 'Textured heavyweight paper for pencil.'),
  ('PPR00043', 30, 24.50, 'Watercolor Block Cold Press', 'Arches', '140lb 100% cotton, 9x12 inches.'),
  ('PPR00044', 25, 26.00, 'Watercolor Block Hot Press', 'Arches', 'Smooth 140lb 100% cotton, 9x12 inches.'),
  ('PPR00045', 50, 12.00, 'Toned Tan Sketch Pad 9x12', 'Strathmore', 'Mid-toned paper for light and dark media.'),
  ('PPR00046', 45, 12.00, 'Toned Gray Sketch Pad 9x12', 'Strathmore', 'Cool gray paper for highlights and shadows.'),
  ('PPR00047', 60, 9.50, 'Sketchbook Hardcover 5x8', 'Moleskine', 'Classic black hardcover sketch paper.'),
  ('PPR00048', 40, 21.00, 'Sketchbook Hardcover A4', 'Leuchtturm1917', 'Premium drawing paper, thread-bound.'),
  ('PPR00049', 20, 35.00, 'Pastelmat Pad 9x12', 'Clairefontaine', 'Specialty textured paper for pastels.'),
  ('PPR00050', 55, 8.00, 'Tracing Paper Pad 9x12', 'Canson', 'Translucent paper for overlays.'),
  ('PNC00051', 100, 2.50, 'Graphite Pencil 2H', 'Faber-Castell', 'Hard lead for light sketching.'),
  ('PNC00052', 120, 2.50, 'Graphite Pencil HB', 'Faber-Castell', 'Medium lead, standard use.'),
  ('PNC00053', 110, 2.50, 'Graphite Pencil 2B', 'Faber-Castell', 'Soft lead for shading.'),
  ('PNC00054', 90, 2.50, 'Graphite Pencil 4B', 'Faber-Castell', 'Very soft lead for dark lines.'),
  ('PNC00055', 80, 2.50, 'Graphite Pencil 6B', 'Faber-Castell', 'Extra soft lead for deep shadows.'),
  ('PNC00056', 40, 15.00, 'Graphite Pencil Tin Set of 12', 'Derwent', 'Assorted grades from 6B to 4H.'),
  ('PNC00057', 200, 3.00, 'Colored Pencil True Blue', 'Prismacolor', 'Soft core artist colored pencil.'),
  ('PNC00058', 180, 3.00, 'Colored Pencil Crimson Red', 'Prismacolor', 'Soft core artist colored pencil.'),
  ('PNC00059', 190, 3.00, 'Colored Pencil Canary Yellow', 'Prismacolor', 'Soft core artist colored pencil.'),
  ('PNC00060', 150, 3.00, 'Colored Pencil White', 'Prismacolor', 'Soft core artist colored pencil, highly opaque.'),
  ('PNC00061', 25, 65.00, 'Colored Pencil Set 48', 'Prismacolor', 'Tin set of 48 soft core pencils.'),
  ('PNC00062', 15, 120.00, 'Polychromos Set 60', 'Faber-Castell', 'Premium oil-based colored pencils.'),
  ('PNC00063', 60, 2.00, 'Vine Charcoal Soft', 'Coates', 'Natural willow charcoal sticks.'),
  ('PNC00064', 55, 2.00, 'Compressed Charcoal Medium', 'General Pencil', 'Dark, dense charcoal blocks.'),
  ('PNC00065', 70, 2.80, 'White Charcoal Pencil', 'General Pencil', 'Opaque white for highlights.'),
  ('PNC00066', 150, 1.50, 'Kneaded Eraser', 'Faber-Castell', 'Moldable eraser for lifting graphite.'),
  ('PNC00067', 120, 1.25, 'White Plastic Eraser', 'Pentel', 'Clean erasing block.'),
  ('PNC00068', 80, 6.50, 'Mechanical Pencil 0.5mm', 'Rotring', 'Precision drafting pencil.'),
  ('PNC00069', 90, 4.00, 'Lead Refills 0.5mm HB', 'Pentel', 'Hi-polymer graphite refills.'),
  ('PNC00070', 40, 5.50, 'Blending Stumps Pack', 'Generic Art', 'Paper tortillons for smudging.'),
  ('MRK00071', 80, 7.99, 'Sketch Marker Black', 'Copic', 'Alcohol-based dual tip marker.'),
  ('MRK00072', 75, 7.99, 'Sketch Marker Cool Gray 3', 'Copic', 'Alcohol-based dual tip marker.'),
  ('MRK00073', 70, 7.99, 'Sketch Marker Pale Aqua', 'Copic', 'Alcohol-based dual tip marker.'),
  ('MRK00074', 65, 7.99, 'Sketch Marker Rose Pink', 'Copic', 'Alcohol-based dual tip marker.'),
  ('MRK00075', 20, 45.00, 'Sketch Marker Set 6 Grays', 'Copic', 'Set of 6 cool grays.'),
  ('MRK00076', 150, 3.50, 'Pigma Micron 01 Black', 'Sakura', 'Archival fineliner 0.25mm.'),
  ('MRK00077', 140, 3.50, 'Pigma Micron 03 Black', 'Sakura', 'Archival fineliner 0.35mm.'),
  ('MRK00078', 130, 3.50, 'Pigma Micron 05 Black', 'Sakura', 'Archival fineliner 0.45mm.'),
  ('MRK00079', 50, 18.00, 'Micron Pen Set of 6', 'Sakura', 'Assorted sizes in black ink.'),
  ('MRK00080', 90, 4.50, 'Brush Pen Black', 'Pentel', 'Pocket brush pen with synthetic bristles.'),
  ('INK00081', 40, 6.50, 'India Ink Black 2oz', 'Speedball', 'Waterproof drawing ink.'),
  ('INK00082', 35, 7.00, 'Acrylic Ink Titanium White', 'Liquitex', 'Fluid acrylic ink for pens and brushes.'),
  ('INK00083', 30, 7.00, 'Acrylic Ink Carbon Black', 'Liquitex', 'Fluid acrylic ink for pens and brushes.'),
  ('INK00084', 25, 9.50, 'Walnut Ink 2oz', 'Tom Nortons', 'Warm sepia-toned drawing ink.'),
  ('INK00085', 50, 4.00, 'Nib Holder Standard', 'Speedball', 'Plastic pen nib holder.'),
  ('INK00086', 80, 2.50, 'Crowquill Nib 102', 'Speedball', 'Flexible fine point dipping nib.'),
  ('INK00087', 60, 3.00, 'Hunt 512 Bowl Point Nib', 'Speedball', 'Medium line dipping nib.'),
  ('INK00088', 20, 16.50, 'Calligraphy Dip Pen Set', 'Speedball', 'Holder with 6 assorted nibs.'),
  ('INK00089', 30, 12.00, 'Glass Dip Pen', 'Generic Art', 'Decorative spiral glass pen.'),
  ('INK00090', 45, 14.00, 'Masking Ink Pen', 'Molotow', 'Pump marker with masking fluid.'),
  ('CNV00091', 40, 8.50, 'Stretched Canvas 8x10', 'Blick', 'Cotton canvas, gallery profile.'),
  ('CNV00092', 35, 12.00, 'Stretched Canvas 11x14', 'Blick', 'Cotton canvas, gallery profile.'),
  ('CNV00093', 25, 18.50, 'Stretched Canvas 16x20', 'Blick', 'Cotton canvas, gallery profile.'),
  ('CNV00094', 15, 32.00, 'Stretched Canvas 24x36', 'Blick', 'Cotton canvas, gallery profile.'),
  ('CNV00095', 50, 4.50, 'Canvas Panel 8x10', 'Fredrix', 'Primed cotton canvas mounted on board.'),
  ('ACC00096', 60, 5.00, 'Plastic Palette 10 Well', 'Generic Art', 'Round plastic mixing palette.'),
  ('ACC00097', 30, 14.50, 'Wood Palette Oval', 'Richeson', 'Classic wooden mixing palette.'),
  ('ACC00098', 40, 8.00, 'Palette Knife Set Plastic', 'Liquitex', 'Set of 5 plastic mixing knives.'),
  ('ACC00099', 25, 12.00, 'Metal Palette Knife Diamond', 'RGM', 'Flexible steel blade for mixing and painting.'),
  ('ACC00100', 20, 28.00, 'Brush Washer Stainless', 'Generic Art', 'Airtight washer for oil painting solvents.');

INSERT INTO assignments (item_id, category_id) VALUES
  -- Paints (Items 1-30) belong to 'Painting' (1)
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
  (11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1), (18, 1), (19, 1), (20, 1),
  (21, 1), (22, 1), (23, 1), (24, 1), (25, 1), (26, 1), (27, 1), (28, 1), (29, 1), (30, 1),
  
  -- Brushes (Items 31-40) belong to 'Painting' (1) and 'Brushes' (3)
  (31, 1), (31, 3), (32, 1), (32, 3), (33, 1), (33, 3), (34, 1), (34, 3), (35, 1), (35, 3),
  (36, 1), (36, 3), (37, 1), (37, 3), (38, 1), (38, 3), (39, 1), (39, 3), (40, 1), (40, 3),
  
  -- Paper & Sketchbooks (Items 41-50) belong to 'Drawing' (2) and 'Paper & Sketchbooks' (4)
  -- Watercolors papers (43, 44) also get 'Painting' (1)
  (41, 2), (41, 4), (42, 2), (42, 4), 
  (43, 1), (43, 2), (43, 4), 
  (44, 1), (44, 2), (44, 4), 
  (45, 2), (45, 4), (46, 2), (46, 4), (47, 2), (47, 4), (48, 2), (48, 4), (49, 2), (49, 4), (50, 2), (50, 4),

  -- Pencils, Charcoal, Erasers (Items 51-70) belong to 'Drawing' (2)
  (51, 2), (52, 2), (53, 2), (54, 2), (55, 2), (56, 2), (57, 2), (58, 2), (59, 2), (60, 2),
  (61, 2), (62, 2), (63, 2), (64, 2), (65, 2), (66, 2), (67, 2), (68, 2), (69, 2), (70, 2),

  -- Markers & Fineliners (Items 71-80) belong to 'Drawing' (2) and 'Markers & Pens' (5)
  (71, 2), (71, 5), (72, 2), (72, 5), (73, 2), (73, 5), (74, 2), (74, 5), (75, 2), (75, 5),
  (76, 2), (76, 5), (77, 2), (77, 5), (78, 2), (78, 5), (79, 2), (79, 5), (80, 2), (80, 5),

  -- Inks, Nibs, Calligraphy (Items 81-90) belong to 'Drawing' (2) and 'Inks' (6)
  -- Acrylic inks (82, 83) also get 'Painting' (1)
  (81, 2), (81, 6), 
  (82, 1), (82, 2), (82, 6), 
  (83, 1), (83, 2), (83, 6), 
  (84, 2), (84, 6), (85, 2), (85, 6), (86, 2), (86, 6), (87, 2), (87, 6), (88, 2), (88, 6), (89, 2), (89, 6), (90, 2), (90, 6),

  -- Canvases (Items 91-95) belong to 'Painting' (1) and 'Canvases & Surfaces' (7)
  (91, 1), (91, 7), (92, 1), (92, 7), (93, 1), (93, 7), (94, 1), (94, 7), (95, 1), (95, 7),

  -- Accessories (Items 96-100) belong to 'Painting' (1) and 'Accessories' (8)
  (96, 1), (96, 8), (97, 1), (97, 8), (98, 1), (98, 8), (99, 1), (99, 8), (100, 1), (100, 8);

    `;

(async () => {
  try {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Seeding successful");
  } catch (error) {
    console.log(`${error}`);
    throw new Error();
  }
})();

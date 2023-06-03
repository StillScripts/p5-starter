import {
  ColorConfig,
  PatternConfig,
  ShapeDesign,
  _PhysicalFeatures
} from './classes/Config'
import { Mandala } from './classes/Mandala'
import {
  BLACK,
  FOREST_COLORS,
  OCEAN_COLORS,
  SECRET_COLORS,
  SUNSET_COLORS,
  TRANSPARENT
} from './constants'

// Secret Pattern
const secretFeaturesInner: _PhysicalFeatures = {
  colorConfig: new ColorConfig(BLACK, SECRET_COLORS, 'layers', '#000', true),
  shapeDesign: new ShapeDesign(false, true, false, 'normal')
}
const secretFeaturesOuter: _PhysicalFeatures = {
  colorConfig: new ColorConfig(BLACK, SECRET_COLORS, 'layers', '#000', true),
  shapeDesign: new ShapeDesign(false, false, false, 'flipped')
}
export const secretPattern = new PatternConfig(
  secretFeaturesInner,
  secretFeaturesOuter,
  [4000, 4000],
  1400,
  new Mandala(3600, 55, 55, 'triangle')
)

// Daniel Pattern
const danielFeaturesInner: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    OCEAN_COLORS,
    OCEAN_COLORS,
    'spiral',
    '#003A69',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(true, false, true, 'none')
}
const danielFeaturesOuter: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    OCEAN_COLORS,
    OCEAN_COLORS,
    'layers',
    '#003A69',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(false, false, true, 'normal')
}
export const danielPattern = new PatternConfig(
  danielFeaturesInner,
  danielFeaturesOuter,
  [4000, 4000],
  1200,
  new Mandala(3200, 48, 48, 'square')
)
export const danielSmallPattern = new PatternConfig(
  danielFeaturesInner,
  danielFeaturesOuter,
  [2000, 2000],
  800,
  new Mandala(1600, 24, 24, 'square'),
  true
)

// Kelli pattern
const kelliShapeInner = new ShapeDesign(false, false, false, 'none')
const kelliColorsInner = new ColorConfig(
  SUNSET_COLORS,
  TRANSPARENT,
  'spiral',
  '#511F30',
  true,
  false,
  0
)
const kelliFeaturesInner: _PhysicalFeatures = {
  colorConfig: kelliColorsInner,
  shapeDesign: kelliShapeInner
}
const kelliShapeOuter = new ShapeDesign(false, false, false, 'normal')
const kelliColorsOuter = new ColorConfig(
  SUNSET_COLORS,
  SUNSET_COLORS,
  'layers',
  '#511F30',
  true,
  false,
  1
)
const kelliFeaturesOuter: _PhysicalFeatures = {
  colorConfig: kelliColorsOuter,
  shapeDesign: kelliShapeOuter
}
export const kelliPattern = new PatternConfig(
  kelliFeaturesInner,
  kelliFeaturesOuter,
  [4000, 4000],
  1500,
  new Mandala(3200, 48, 36, 'triangle-flipped')
)

// Kelli animation pattern
const kelliAnimationShapeInner = new ShapeDesign(false, false, false, 'normal')
const kelliAnimationColorsInner = new ColorConfig(
  SUNSET_COLORS,
  TRANSPARENT,
  'spiral',
  '#511F30',
  true,
  false,
  3
)
const kelliAnimationFeaturesInner: _PhysicalFeatures = {
  colorConfig: kelliAnimationColorsInner,
  shapeDesign: kelliAnimationShapeInner
}
const kelliAnimationShapeOuter = new ShapeDesign(false, false, false, 'flipped')
const kelliAnimationColorsOuter = new ColorConfig(
  TRANSPARENT,
  SUNSET_COLORS,
  'layers',
  '#511F30',
  false,
  false
)
const kelliAnimationFeaturesOuter: _PhysicalFeatures = {
  colorConfig: kelliAnimationColorsOuter,
  shapeDesign: kelliAnimationShapeOuter
}
export const kelliAnimationPattern = new PatternConfig(
  kelliAnimationFeaturesInner,
  kelliAnimationFeaturesOuter,
  [1920, 1920],
  10,
  new Mandala(1000, 10, 12, 'triangle-flipped'),
  false
)

// Ocean Spiral Pattern
const oceanSwirl: _PhysicalFeatures = {
  colorConfig: new ColorConfig(OCEAN_COLORS, OCEAN_COLORS, 'spiral', '#003A69'),
  shapeDesign: new ShapeDesign(true, false, true, 'none')
}
const oceanWave: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    TRANSPARENT,
    OCEAN_COLORS,
    'layers',
    '#003A69',
    true,
    false
  ),
  shapeDesign: new ShapeDesign(false, false, false, 'normal')
}
export const oceanPattern = new PatternConfig(
  oceanSwirl,
  oceanWave,
  [4000, 4000],
  1200,
  new Mandala(3800, 36, 36, 'triangle-flipped')
)

// Ocean Print
const oceanPrintInner: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    OCEAN_COLORS,
    TRANSPARENT,
    'spiral',
    '#003A69',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(true, false, true, 'none')
}
const oceanPrintOuter: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    OCEAN_COLORS,
    OCEAN_COLORS,
    'layers',
    '#003A69',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(false, false, true, 'normal')
}
export const oceanPrintPattern = new PatternConfig(
  oceanPrintInner,
  oceanPrintOuter,
  [4000, 4000],
  1200,
  new Mandala(3200, 48, 48, 'square')
)

// Pentagon design (Ocean)
const oceanPentInner: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    TRANSPARENT,
    OCEAN_COLORS,
    'layers',
    '#003A69',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(false, false, false, 'normal')
}
const oceanPentOuter: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    OCEAN_COLORS,
    BLACK,
    'layers',
    '#003A69',
    true,
    false
  ),
  shapeDesign: new ShapeDesign(false, false, true, 'flipped')
}
export const oceanPentPattern = new PatternConfig(
  oceanPentInner,
  oceanPentOuter,
  [4000, 4000],
  1000,
  new Mandala(4800, 10, 10, 'pent')
)

// Caitie Forest Pattern
const forestPrintInner: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    FOREST_COLORS,
    FOREST_COLORS,
    'spiral',
    '#0A260D',
    true
  ),
  shapeDesign: new ShapeDesign(false, true, false, 'none')
}
const forestPrintOuter: _PhysicalFeatures = {
  colorConfig: new ColorConfig(
    FOREST_COLORS,
    FOREST_COLORS,
    'layers',
    '#0A260D',
    true,
    false,
    1
  ),
  shapeDesign: new ShapeDesign(false, false, false, 'normal')
}
export const forestPrintPattern = new PatternConfig(
  forestPrintInner,
  forestPrintOuter,
  [4000, 4000],
  1200,
  new Mandala(3200, 48, 48, 'triangle')
)

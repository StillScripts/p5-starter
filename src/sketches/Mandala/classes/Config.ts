import { Mandala } from './Mandala'

export type ColorDirection = 'expanding' | 'contracting'

export interface _ColorConfig {
  bgColorScheme: string[] // Color scheme for background
  strokeColorScheme: string[] // Color scheme for lines
  colorPatternType: 'layers' | 'spiral'
  backgroundColor: string // The background color of the pattern
  innerColorChange?: boolean // Change colors in the inner fractal
  isRandom?: boolean // Whether to apply randomness to color scheme
  spaces?: number // Whether to apply spaces to the color scheme
  direction?: ColorDirection // The direction of the ordered color scheme
}

export type FractalOption = 'none' | 'normal' | 'flipped' // How to handle inner fractals

export interface _ShapeDesign {
  isRound: boolean // If true, shape will be a circle
  isInverted: boolean // If true, the shape's lines start at the core like a flower
  isStar: boolean // If true, the shape will be a star
  innerFractals: FractalOption // If true, the shape will contain inner fractals
}

export interface _PhysicalFeatures {
  colorConfig: ColorConfig // The color configuration of the shape
  shapeDesign: ShapeDesign // The geometric design of the shape
}

// export interface _PatternConfig {
//   backgroundConfig: _PhysicalFeatures; // Settings for the pattern in the background
//   foregroundConfig: _PhysicalFeatures; // Settings for the pattern in the foreground
// }

export interface _PatternConfig {
  innerPattern: _PhysicalFeatures // The color scheme and shape design of the inner pattern
  outerPattern: _PhysicalFeatures // The color scheme and shape design of the outer pattern
  canvas: number[] // The size of the canvas
  edgeDiameter: number // The radius at which the pattern switches from inner to outer
  mandala: Mandala // The configuration for the mandala pattern
  animate?: boolean // Related to animating the pattern, probably needs more
}

/**
 * Class for color pattern
 */
export class ColorConfig implements _ColorConfig {
  bgColorScheme: string[]
  strokeColorScheme: string[]
  colorPatternType: 'layers' | 'spiral'
  backgroundColor: string
  innerColorChange?: boolean
  isRandom?: boolean
  spaces?: number
  direction?: 'expanding' | 'contracting'

  constructor(
    bgColorScheme: string[],
    strokeColorScheme: string[],
    colorPatternType: 'layers' | 'spiral',
    backgroundColor: string,
    innerColorChange?: boolean,
    isRandom?: boolean,
    spaces?: number,
    direction?: 'expanding' | 'contracting'
  ) {
    if (spaces) {
      // Apply spacing to the colors if there is a space needed
      bgColorScheme = this.addSpaceToColors(
        bgColorScheme,
        backgroundColor,
        spaces
      )
      strokeColorScheme = this.addSpaceToColors(
        strokeColorScheme,
        'rgba(0,0,0,0)',
        spaces
      )
    }
    this.bgColorScheme = bgColorScheme
    this.strokeColorScheme = strokeColorScheme
    this.colorPatternType = colorPatternType
    this.backgroundColor = backgroundColor
    this.innerColorChange = innerColorChange
    this.isRandom = isRandom
    this.spaces = spaces
    this.direction = direction
  }

  /**
   * Method to add the background color between each color in the color scheme
   * @param {string[]} colors - The color scheme
   * @param {string} bg - The background color
   * @returns {string[]}
   */
  addSpaceToColors(colors: string[], bg: string, spaces: number): string[] {
    const spacedColors: string[] = []
    colors.forEach((color) => {
      spacedColors.push(color)
      for (let i = 0; i < spaces; i++) {
        spacedColors.push(bg)
      }
    })
    return spacedColors
  }
  /**
   * Method which shifts the order of the color array to
   * create a whirlpool or ripple animation effect
   * @param option - Either expand or contract
   * @param shiftBackground - Whether or not to shift the background of shapes
   * @param shiftStroke - Whether or not to shift the stroke color of shapes
   */
  shiftColors(
    option: 'expand' | 'contract',
    shiftBackground?: boolean,
    shiftStroke?: boolean
  ) {
    if (shiftBackground) {
      this.bgColorScheme =
        option === 'expand'
          ? ([...this.bgColorScheme, this.bgColorScheme.shift()] as string[])
          : ([this.bgColorScheme.pop(), ...this.bgColorScheme] as string[])
    }
    if (shiftStroke) {
      this.strokeColorScheme =
        option === 'expand'
          ? ([
              ...this.strokeColorScheme,
              this.strokeColorScheme.shift()
            ] as string[])
          : ([
              this.strokeColorScheme.pop(),
              ...this.strokeColorScheme
            ] as string[])
    }
  }
}

/**
 * Class used for the config segments of a shape pattern
 */
export class ShapeDesign implements _ShapeDesign {
  isRound: boolean
  isInverted: boolean
  isStar: boolean
  innerFractals: 'none' | 'normal' | 'flipped'
  constructor(
    isRound: boolean,
    isInverted: boolean,
    isStar: boolean,
    innerFractals: 'none' | 'normal' | 'flipped'
  ) {
    this.isRound = isRound
    this.isInverted = isInverted
    this.isStar = isStar
    this.innerFractals = innerFractals
  }
}

/**
 * Settings for a pattern that can be animated
 */
export class PatternConfig implements _PatternConfig {
  innerPattern: _PhysicalFeatures
  outerPattern: _PhysicalFeatures
  canvas: number[]
  edgeDiameter: number
  mandala: Mandala
  animate?: boolean
  constructor(
    innerPattern: _PhysicalFeatures,
    outerPattern: _PhysicalFeatures,
    canvas: number[],
    edgeDiameter: number,
    mandala: Mandala,
    animate?: boolean
  ) {
    this.innerPattern = innerPattern
    this.outerPattern = outerPattern
    this.canvas = canvas
    this.edgeDiameter = edgeDiameter
    this.mandala = mandala
    this.animate = animate
  }
}

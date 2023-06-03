import p5 from 'p5'
import * as patterns from './configurations'
import { draw } from './draw'
import { setup } from './setup'

const pattern = patterns.kelliPattern

/**
 * @param {p5} p - The pj.js object used to store all data about the canvas
 */
const sketch = (p: p5) => {
  const shapes = setup(p, pattern)

  p.draw = () => {
    draw(p, shapes, pattern)
  }

  p.keyPressed = () => {
    // Export sketch's canvas to file
    if (p.keyCode === 80) {
      p.saveCanvas('sketch', 'png')
    }
  }
}

export default sketch

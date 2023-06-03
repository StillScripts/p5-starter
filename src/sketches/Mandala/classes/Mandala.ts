import { MandalaType } from "../Mandala/mandalaFunctions";
import { Coordinate } from "./Shape";

/**
 * Class for the Mandala object which is used to control the unique aspects of a Mandala pattern
 */
export class Mandala {
  diameter: number; // The diameter of the outer shape
  limit: number; // The number of layers of the geometry
  numberOfShapes: number; // The  number of squares in the pattern
  patternType: MandalaType; // Whether it is a triangle or square pattern
  displacement?: Coordinate; // The extra X and Y values to add to the shape
  constructor(
    diameter: number,
    limit: number,
    numberOfShapes: number,
    patternType: MandalaType,
    displacement?: Coordinate
  ) {
    this.diameter = diameter;
    this.limit = limit;
    this.numberOfShapes = numberOfShapes;
    this.patternType = patternType;
    this.displacement = displacement;
  }
}

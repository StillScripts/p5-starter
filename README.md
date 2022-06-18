# P5.js Starter

The easiest way for developers to create complex animations and design images in the browser using the p5.js library. [**View live demo**](https://unrivaled-melomakarona-070349.netlify.app/?sketch=rotating-shapes)

This starter repo comes equipped with [**p5.js**](https://p5js.org/), [**Vite**](https://vitejs.dev/), and [**TypeScript**](https://www.typescriptlang.org/), to enable a great developer experience. Additionally, **4 example sketches** have been included to provide samples of what can be done and help with learning how p5.js works. 

## Getting Started

Clone the repo: 

```bash
git clone https://github.com/StillScripts/p5-starter.git
```

Install the dependencies:
```bash
npm install
# or 
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Example Sketches

In the `src/sketches` folder you will find four example sketches.
- **Shapes**: A simple demo of creating an array of shapes and applying rotation to move them around the canvas. Based on [this](https://p5js.org/examples/form-regular-polygon.html).
- **Clock**: An animation of an analog clock that ticks each second. Based on [this](https://p5js.org/examples/input-clock.html).
- **Particle System**: A simulation of moving particles spawning and fading. Based on [this](https://p5js.org/examples/simulate-particle-system.html).
- **Bouncy Bubbles**: A simulation of a group of bubbles moving around and bouncing into each other until gravity brings them to the ground. Based on[this](https://p5js.org/examples/motion-bouncy-bubbles.html).


You can easily create new sketches by creating a new sketch in the `src/sketches` folder and adding it to the sketchMap object in `src/sketches/sketchMap.ts`. 

It may be helpful to use an `index.ts` file containing the function for the sketch and a `classes.ts` file containing classes used in the sketch, as I have done in the example sketches, but feel free to create sketches in any way that suits you.

The project has also been set up to enable using a simple select input for navigating between all of the sketches in the sketchMap object. A URL parameter of *sketch* is used to let the app know which sketch to render. For example: *?sketch=shapes* will render the Shapes sketch.

## Components
This project uses vanilla TypeScript so that you can use p5.js as it was intended (*without a JavaScript framework complicating DOM interactions*). 

To ensure that the project still uses a component structure similar to JavaScript frameworks, the page has been organised into three components: 
- **Header**: This contains the main heading on the page and the links to documentation. It is located at `src/components/Header/Header.ts`.
- **SketchContainer**: This contains the div element where the p5.js sketch will be placed. It is located at `src/components/SketchContainer/SketchContainer.ts`.
- **SketchSelector**: To enable you to easily navigate between the sketches you are building, or publish a website where all your sketches can be explored, a select input is used. It shows an option for each key in the sketchMap. It is located at `src/components/SketchSelector/SketchSelector.ts`.

## Pull Requests
This project is accepting pull requests. Feel free to add additional example sketches or fix any issues you see. Let's work together to enable frontend developers to turn their code into art by offering the best place to get started with p5.js! :grinning: 

## Live Demo
View a live demo of this project [here](https://unrivaled-melomakarona-070349.netlify.app/?sketch=rotating-shapes) 

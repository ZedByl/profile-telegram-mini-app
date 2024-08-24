import { Dispatch, SetStateAction } from 'react';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Easing, Tween } from '@tweenjs/tween.js';

import { Resizer } from '@lib/3d/systems/Resizer';
import { Loop } from '@lib/3d/systems/Loop';

import { createBackground, createCamera, createLights, createScene, createSkull } from '@lib/3d/components';
import { createRenderer } from '@lib/3d/systems/renderer';
import { ExtendsMash, ExtendsObject3D } from '@lib/3d/types';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;
let rootContainer: HTMLElement;
let skull: ExtendsObject3D;
let bg: ExtendsMash;
let setIsReady: Dispatch<SetStateAction<boolean>>;

class World {
  constructor(container: HTMLElement, fc: Dispatch<SetStateAction<boolean>>) {
    setIsReady = fc;
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    rootContainer = container;

    rootContainer.append(renderer.domElement);

    this.initializeSkull();
    bg = createBackground();
    const [one, two] = createLights();

    loop.updatables.push(bg);

    scene.add(bg, one, two);

    new Resizer(rootContainer, camera, renderer);
  }

  async initializeSkull() {
    try {
      skull = await createSkull();
      const animatePosition = new Tween(skull.position)
      .to({ z: 0.25, y: 0 }, 3200)
      .easing(Easing.Quadratic.Out)
      .start();

      const animateRotation = new Tween(skull.rotation)
      .to({ x: -0.7 }, 3200)
      .easing(Easing.Quadratic.Out)
      .start();

      loop.updatables.push(skull);

      if (skull) {
        setIsReady(true);
        scene.add(skull);

        skull.tick = () => {
          animatePosition.update();
          animateRotation.update();
        };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleScroll() {
    if (skull) {
      const scrollY = window.scrollY || window.pageYOffset;
      skull.rotation.x = -0.7 - (scrollY * 0.0005);
    }
  }

  listener() {
    window.addEventListener('scroll', this.handleScroll);
  }

  removeListener() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };

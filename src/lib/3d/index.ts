import { Dispatch, SetStateAction } from 'react';
import { BufferGeometry, Material, MathUtils, Mesh, NormalBufferAttributes, Object3D, Object3DEventMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { Resizer } from '@lib/3d/systems/Resizer';
import { Loop } from '@lib/3d/systems/Loop';

import { createBackground, createCamera, createLights, createScene, createSkull } from '@lib/3d/components';
import { createRenderer } from '@lib/3d/systems/renderer';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;
let rootContainer: HTMLElement;
let skull: Object3D<Object3DEventMap>
let bg: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
let setIsReady: Dispatch<SetStateAction<boolean>>

class World {
  constructor(container: HTMLElement,
              // fc: Dispatch<SetStateAction<boolean>>
  ) {
    // setIsReady = fc
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    rootContainer = container

    rootContainer.append(renderer.domElement);

    this.initializeSkull()
    bg = createBackground();
    const light = createLights();

    loop.updatables.push(bg);

    scene.add(bg, light);

    new Resizer(rootContainer, camera, renderer);
  }

  async initializeSkull() {
    try {
      skull = await createSkull(this.handleScroll);

      if (skull) {
        // setIsReady(true);
        loop.updatables.push(skull);
        scene.add(skull);
      }

      const radiansPerSecond = MathUtils.degToRad(500);

      // @ts-ignore
      skull.tick = (delta: number) => {
        if (skull.position.z <= 0.25) {
          skull.position.z += radiansPerSecond * delta;
        }
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
    window.addEventListener('scroll', this.handleScroll)
  }

  removeListener() {
    window.removeEventListener('scroll', this.handleScroll)
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

  destroy() {
    rootContainer.removeChild(renderer.domElement)
    scene.remove(skull)
    scene.remove(bg)
  }
}

export { World };

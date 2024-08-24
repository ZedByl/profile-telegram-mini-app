import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';

function createControls(camera: PerspectiveCamera, canvas: HTMLElement) {
  const controls = new OrbitControls(camera, canvas);

  controls.autoRotate = true;
  controls.enableDamping = true;

  // @ts-ignore
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };

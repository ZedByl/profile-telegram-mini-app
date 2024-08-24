import { PerspectiveCamera } from 'three';

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(0, 0, 1);

  return camera;
}

export { createCamera };

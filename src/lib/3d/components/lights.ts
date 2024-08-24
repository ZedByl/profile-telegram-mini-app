import { PointLight } from 'three';

function createLights() {
  const light = new PointLight(0xffffff, 100, 100);
  light.position.set(2, 2, 2);

  return light;
}

export { createLights };

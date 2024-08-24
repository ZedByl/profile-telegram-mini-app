import { PointLight } from 'three';

function createLights() {
  const light = new PointLight(0xffffff, 500, 500);
  light.position.set(-2.5, 3, 3);
  light.rotation.x = -0.3;

  const lightTwo = new PointLight(0x900020, 100, 100);
  lightTwo.position.set(2.5, -0.4, 3);
  lightTwo.rotation.x = -0.3;

  return [light, lightTwo];
}

export { createLights };

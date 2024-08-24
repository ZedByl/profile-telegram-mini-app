import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ExtendsObject3D } from '@lib/3d/types';

async function createSkull(): Promise<ExtendsObject3D> {
  const loader = new GLTFLoader();

  const data = await loader.loadAsync('models/skull/scene.gltf');

  const model = data.scene.children[0];

  model.scale.set(0.15, 0.15, 0.15);
  model.position.setZ(-1.6);
  model.position.setY(-0.8);
  model.rotation.x = -2.2;

  return model;
}

export { createSkull };

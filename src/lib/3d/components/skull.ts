import { Object3D, Object3DEventMap } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

async function createSkull(handleScroll: any): Promise<Object3D<Object3DEventMap>> {
  const loader = new GLTFLoader();

  const data = await loader.loadAsync('models/skull/scene.gltf');

  const model = data.scene.children[0]

  model.scale.set(0.15, 0.15, 0.15);
  model.position.setZ(-0.2)
  model.rotation.x = -0.7

  return model;
}

export { createSkull };

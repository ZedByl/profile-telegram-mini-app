import { WebGLRenderer } from 'three';

function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer();

  return renderer;
}

export { createRenderer };

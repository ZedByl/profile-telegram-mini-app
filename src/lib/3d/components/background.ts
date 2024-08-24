import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '@lib/3d/shader';

function createBackground(): Mesh {
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 }
    }
  });
  const plane = new Mesh(geometry, material);

  // @ts-ignore
  plane.tick = (delta: number) => {
    plane.material.uniforms.uTime.value = delta * 0.001;
  }

  return plane;
}

export { createBackground };

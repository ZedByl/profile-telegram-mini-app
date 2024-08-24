import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '@lib/3d/shader';
import { ExtendsMash } from '@lib/3d/types';

function createBackground(): ExtendsMash {
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 }
    }
  });
  const plane: ExtendsMash = new Mesh(geometry, material);

  plane.position.z = -0.2;

  plane.tick = (delta: number) => {
    plane.material.uniforms.uTime.value = delta * 0.001;
  };

  return plane;
}

export { createBackground };

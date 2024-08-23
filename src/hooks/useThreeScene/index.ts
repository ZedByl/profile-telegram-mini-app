import { useEffect, useRef, useState } from 'react';
import { Mesh, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from 'three';
import { fragmentShader, vertexShader } from '@hooks/useThreeScene/shader';

export const useThreeScene = () => {
  const [isMount, setIsMount] = useState(false)
  const [scene, setScene] = useState<Scene | null>(null);
  const [camera, setCamera] = useState<PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null);

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.2, 100);
    const renderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    const elem = document.getElementById('three-id');
    elem?.appendChild(renderer.domElement)

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    return () => {
      elem?.removeChild(renderer.domElement)
    };
  }, [isMount]);

  useEffect(() => {
    if (scene && camera && renderer) {
      const geometry = new PlaneGeometry(2, 2);
      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0.0 }
        }
      });
      const plane = new Mesh(geometry, material);

      scene.add(plane);
      camera.position.z = 1;

      const animate = (time: number) => {
        if (!renderer || !scene || !camera) return;
        requestAnimationFrame(animate);
        material.uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
      };

      animate(0);

      const handleMouseEvent = (event: MouseEvent) => {
        if (camera) {
          camera.position.x = (event.clientX / window.innerWidth - 0.5) * 2;
          camera.position.y = -(event.clientY / window.innerHeight - 0.5) * 2;
          camera.lookAt(scene.position);
        }
      };

      const handleScroll = () => {
        if (camera) {
          const scrollY = window.scrollY || window.pageYOffset;
          camera.position.z = 1 + scrollY * 0.01;
          camera.lookAt(scene.position);
        }
      };

      window.addEventListener('mousemove', handleMouseEvent);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('mousemove', handleMouseEvent);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scene, camera, renderer]);

  return { isMount, scene, camera, renderer };
};

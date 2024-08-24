import { useEffect, useRef, useState } from 'react';
import { World } from '@lib/3d';

export const useThreeScene = () => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const worldRef = useRef<World>(null);

  useEffect(() => {
    const elem = document.getElementById('three-id');

    if (elem && !worldRef.current) {
      // @ts-ignore
      worldRef.current = new World(elem, setIsReady);

      worldRef.current.listener();

      return () => {
        if (worldRef.current) {
          worldRef.current.removeListener();
        }
      };
    }
  }, []);

  console.log(worldRef)

  // Функция рендеринга
  useEffect(() => {
    if (isReady && worldRef.current) {
      console.log(12)
      worldRef.current?.start();
    }
  }, [isReady]);

  return { isReady };
};

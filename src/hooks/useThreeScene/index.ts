import { useEffect, useRef, useState } from 'react';
import { World } from '@lib/3d';

export const useThreeScene = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const worldRef = useRef<World | null>(null);

  useEffect(() => {
    const elem = document.getElementById('three-id');

    if (elem && !worldRef.current) {
      worldRef.current = new World(elem, setIsReady);
    }

    if (!worldRef.current) return;
    worldRef.current.listener();

    return () => {
      if (worldRef.current) {
        worldRef.current.removeListener();
      }
    };
  }, []);

  useEffect(() => {
    if (isReady && worldRef.current) {
      worldRef.current?.start();
    }
  }, [isReady]);

  return { isReady };
};

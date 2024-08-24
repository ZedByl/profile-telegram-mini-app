import { useEffect, useState } from 'react';
import { World } from '@lib/3d';

export const useThreeScene = () => {
  const [isReady, setIsReady] = useState<boolean>(true)

  useEffect(() => {
    const elem = document.getElementById('three-id');

    if (!elem) return
    const world = new World(elem)

    world.listener()
    world.start()

    return () => {
      world.destroy()
      world.removeListener()
    };
  }, []);

  return { isReady };
};

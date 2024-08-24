import { useEffect } from 'react';
import { World } from '@lib/3d';

export const useThreeScene = () => {
  useEffect(() => {
    const elem = document.getElementById('three-id');

    if (!elem) return
    const world = new World(elem)

    world.start()
    world.listener()

    return () => {
      world.destroy()
      world.removeListener()
    };
  }, []);
};

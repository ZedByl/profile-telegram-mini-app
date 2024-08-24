import { Mesh, Object3D, PlaneGeometry, ShaderMaterial } from 'three';

interface ITick {
  tick?: (delta: number) => void;
}

export interface ExtendsObject3D extends Object3D, ITick {
}

export interface ExtendsMash extends Mesh<PlaneGeometry, ShaderMaterial>, ITick {
}

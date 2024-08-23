export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  // Simplex noise function or other noise function can be used
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv * 5.0;
    float n = noise(uv + uTime * 0.1);

    // Create a neural network-like background with changing patterns
    vec3 color = vec3(n, n * 0.5, 1.0 - n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const CLOUD_RADIUS = 12;

// Radius where the normalized density drops to ~5% (where the shader starts fading points in)
export const visibleRadius = (n: number, l: number) => Math.min(CLOUD_RADIUS, n * (3 + 2.4 * l));

export const VERTEX_SHADER = `
  varying float vProbability;
  uniform float uN;
  uniform float uL;
  uniform float uPixelRatio;

  void main() {
    vec3 pos = position;
    float r = length(pos);
    
    // Polar angle from the y axis, so lobes stand vertical and face the camera side-on
    float theta = acos(clamp(pos.y / r, -1.0, 1.0));
    
    // Probability Density Approximation
    float angular = 1.0;
    if (uL == 1.0) angular = abs(cos(theta)); 
    if (uL == 2.0) angular = abs(3.0 * pow(cos(theta), 2.0) - 1.0) * 0.5; 
    
    // Normalized so the peak (at r = l * n) is 1 for every n and l
    float x = r / uN;
    float radial = uL == 0.0 ? exp(-x) : pow(x / uL, uL) * exp(uL - x);
    vProbability = radial * angular;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (4.0 + 8.0 * vProbability) * uPixelRatio * (6.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const FRAGMENT_SHADER = `
  varying float vProbability;
  uniform vec3 uColor;

  void main() {
    if (vProbability < 0.02) discard;
    
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;

    float glow = pow(1.0 - dist * 2.0, 2.2);
    float alpha = smoothstep(0.02, 0.55, vProbability) * glow;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

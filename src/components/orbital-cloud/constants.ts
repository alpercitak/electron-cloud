export const VERTEX_SHADER = `
  varying float vProbability;
  uniform float uN;
  uniform float uL;

  void main() {
    vec3 pos = position;
    float r = length(pos);
    
    // Spherical coordinates
    float theta = acos(clamp(pos.z / r, -1.0, 1.0));
    
    // Probability Density Approximation
    float angular = 1.0;
    if (uL == 1.0) angular = abs(cos(theta)); 
    if (uL == 2.0) angular = abs(3.0 * pow(cos(theta), 2.0) - 1.0); 
    
    float radial = exp(-r / uN) * pow(r, uL);
    float probability = radial * angular;
    vProbability = clamp(probability * 0.35, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (4.0 + 8.0 * vProbability) * (1.0 / -mvPosition.z);
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

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture;

void main() {
  vec4 color = texture2D(u_texture, vTexCoord);
  
  color = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, 1.0);

  gl_FragColor = color;
}
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D uTexture;

void main() {
  vec4 color = texture2D(uTexture, vTexCoord);
  
  gl_FragColor = color;
}
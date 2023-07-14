#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform float uScale;
uniform float uXpos;
uniform float uYpos;
uniform float uRotation;
uniform float uPivotX;
uniform float uPivotY;

// fix pivot scale
void main() {
  vec2 p= vec2(uPivotX, uPivotY);
  vTexCoord = aTexCoord;
  vec3 pivot= vec3(aPosition.xy - p, aPosition.z);
  vec4 positionVec4 = vec4(pivot, 1.0);

  vec2 translation= vec2(uXpos + p.x * uScale , uYpos + p.y  * uScale);

  float rad= uRotation * PI / 180.0;
  vec2 rot =vec2(sin(rad), cos(rad));

  vec2 rotatedPosition = vec2(
     positionVec4.x * rot.y + positionVec4.y * rot.x,
     positionVec4.y * rot.y - positionVec4.x * rot.x);

  rotatedPosition= rotatedPosition * uScale - 1.0;
  positionVec4.xy = rotatedPosition + translation ;
  positionVec4.y= positionVec4.y * -1.0;

  gl_Position = positionVec4;
}
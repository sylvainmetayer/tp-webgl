attribute vec4 position;
attribute vec4 color;
varying vec4 vColor;

//Transformation
uniform float translation;
uniform float angle;
uniform mat4 matrix;

void main() {
     vColor = color;
     float x = position[0];
     float y = position[1];
     gl_Position = matrix * vec4(x, y, 0.0, 1.0);
}

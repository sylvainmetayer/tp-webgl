attribute vec3 vertex_position;
attribute vec4 color;

uniform mat4 PMatrix;
uniform mat4 MMatrix;
varying float profondeur;

varying vec4 vColor;

void main() {
    vColor = color;
    gl_Position =  PMatrix * MMatrix * vec4(vertex_position,1.0);
    profondeur = vertex_position.y/2.0+0.5;
}

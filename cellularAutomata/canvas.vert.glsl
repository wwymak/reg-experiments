precision mediump float;
varying vec2 uv;
attribute vec2 position;
void main() {
    //uv to pass coords from vert shader to frag shader
    // Convert from clipspace to colorspace.
    // Clipspace goes -1.0 to +1.0
    // Colorspace goes from 0.0 to 1.0
    // so uv = 0.5 * gl_Position + 0.5
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}

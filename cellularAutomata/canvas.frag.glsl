precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;

void main() {
    //get the state usisg a texture2d sampler for every uv coord from the vert shader
    float state = texture2D(prevState, uv).r;
    gl_FragColor = vec4(vec3(state), 1);
}

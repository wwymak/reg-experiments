precision mediump float;
//sampler2D is a type and looks at textures
// here it referes to the prevState which is used for updating
uniform sampler2D prevState;
// to calculate the scaling
uniform float gridSize;
//the position vector to calculate cell state
varying vec2 uv;

// get the state of the neighbour at x, y from the one that is currently being sampled
//rgb channels are equal so only take the r value is fine
int getState(int x, int y) {
    return int(texture2D(prevState, uv + vec2(x, y)/ float(gridSize)).r);
}
void main() {
    int sum = getState(-1, -1) +
              getState(-1,  0) +
              getState(-1,  1) +
              getState( 0, -1) +
              getState( 0,  1) +
              getState( 1, -1) +
              getState( 1,  0) +
              getState( 1,  1);

    if(sum == 3) {
        gl_FragColor = vec4(1.0,1.0,1.0,1);
    } else if (sum == 2) {
        float current = float(getState(0,0));
        gl_FragColor = vec4(current, current, current, 1.0);
    } else {
        gl_FragColor = vec4(0,0,0,1);
    }
}

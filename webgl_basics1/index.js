const regl = require('regl')();
let x1 = -0.4;
let x2 = 0.8;
let y1 = 0;
let y2 = 0.3;
regl.clear({
    color: [0,0,0,1],
    depth:1
});
const draw1 = regl({
    vert: `
        precision mediump float;
        attribute vec2 a_position;
        
        void main() {
            gl_Position = vec4(a_position, 0, 1);
        }
    `,
    frag: `
        precision mediump float;
        uniform vec4 color;
        void main() {
            gl_FragColor = color;
        }
    `,
    attributes: {
        a_position: [
            [x1, y1],
            [x2, y1],
            [x1, y2],
            [x1, y2],
            [x2, y1],
            [x2, y2]
        ]
    },
    uniforms : {
        color:  regl.prop('color')
    },
    count: 6

});
draw1({
    color: [1,0,0.5,1]
});

setTimeout(() => {
    draw1({
        color: [0,1,0.5,1]
    })
},10000);
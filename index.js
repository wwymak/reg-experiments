const regl = require('regl')();

const stateSize = 512;
let initial_conditions = Array(stateSize ** 2 ).fill(0).map(d => Math.random() < 0.9? 0: 255);

let texture1 = regl.texture({
    radius: stateSize,
    data: Array(stateSize ** 2).fill(0).map((d, i) => {
        let idx = Math.floor(i/4);
        return initial_conditions[idx]
    }),
    wrap: 'repeat',
    format: 'rgba'
});

let texture2 = regl.texture({
    radius: stateSize,
    data: Array(stateSize ** 2 ).fill(0).map((d, i) => {
        let idx = Math.floor(i/4);
        return initial_conditions[idx]
    }),
    wrap: 'repeat',
    format: 'rgba'
});

let backFrameBuffer = regl.framebuffer({
    color: texture1,
    depthStencil: false
});

let frontFrameBuffer = regl.framebuffer({
    color: texture2,
    depthStencil: false
});
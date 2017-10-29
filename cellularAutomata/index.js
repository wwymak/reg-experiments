const regl = require('regl')();
const glslify = require('glslify');

//resolution-- the higher this number,the finer the cells are
const RADIUS = 512;
// const INIT_COND = (new Array(RADIUS * RADIUS * 4)).fill(0).map(
const INIT_COND = (new Array(RADIUS * RADIUS )).fill(0).map(
    () => Math.random() > 0.7 ? 255 : 0);
//set up intial state with 2 arrays, one for the current state, one for updating, to start off, they are both the same
//so e.g. frontState == 'drawn', backState => derived from frontState according to GOL rules.
//then swap front and back states, etc
const state = new Array(2).fill(0).map(() => regl.framebuffer({
    color: regl.texture({
        radius: RADIUS,
        data: INIT_COND,
        wrap: 'repeat'
    }),
    depthStencil: false
}));

const updateStates = regl({
    frag: glslify('./life.frag.glsl'),
    //swapping the framebuffers back and forth, one for rendering, one for updating
    framebuffer: (context) => state[(context.tick + 1) % 2],
    uniforms: {
        gridSize: RADIUS
    }

});

const setupCanvas = regl({
    frag: glslify('./canvas.frag.glsl'),
    vert: glslify('./canvas.vert.glsl'),
    uniforms:{
        prevState: ({tick}) => state[tick % 2]
    },
    attributes: {
        position: [ -1, -1, 1, -1, 0, 1 ]
        // position: [ -4, -4, 4, -4, 0, 4 ]
    },
    depth: { enable: false },
    count: 3
});

regl.frame(() => {
    setupCanvas(() => {
        regl.draw();
        updateStates();
    })
})
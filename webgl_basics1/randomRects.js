const regl = require('regl')();

const generateRandomRects = function () {
    let x1 = 2 * Math.random() -1;
    let y1 = 2 * Math.random() -1;
    let width = Math.random()*0.7;
    let height = Math.random() * 0.7;

    let x2 = x1 + width;
    let y2 = y1 + height;

    return [
        [x1, y1],
        [x2, y1],
        [x1, y2],
        [x1, y2],
        [x2, y1],
        [x2, y2]
    ]
};

let initInputPos = new Array(15).fill(0).forEach(d => {d = generateRandomRects()});

const batchRects = regl({
    vert: `
        precision mediump float;
        attribute vec2 a_position2;
        
        void main() {
            gl_Position = vec4(a_position2, 0, 1);
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
        a_position2: (context, props, batchId) => {
            let posArray = props.initPos;
            let offset = 15 ;
            if (offset+ posArray[0][0] > 1000) //screenwidth
            {offset = -15}
            posArray.forEach(d => {d[0] += offset})
            return posArray
        },
        a_position: () => {
            let x1 = 2 * Math.random() -1;
            let y1 = 2 * Math.random() -1;
            let width = Math.random()*0.7;
            let height = Math.random() * 0.7;

            let x2 = x1 + width;
            let y2 = y1 + height;

            return [
                [x1, y1],
                [x2, y1],
                [x1, y2],
                [x1, y2],
                [x2, y1],
                [x2, y2]
            ]
        }
    },
    uniforms : {
        color:  () => {
            let alpha = Math.random();
            if(alpha > 0.5) {
                alpha += 0.5;
            }
            return [Math.random(), Math.random(), Math.random(), alpha]
        },
    },
    count: 6

});

regl.frame(() => {
    regl.clear({
        color: [0,0,0,1],
        depth:1
    });
    batchRects(initInputPos);
});

// const sensitivityX = 2;
// const sensitivityY = 1;
// const sensitivityZ = 0.1;
// const scaleFactor = 100;

const incr = .05;

let buffer;
let start;
let xoff;
// let cam;

function preload() {
    // load our shader
    sketchShader = loadShader(
        'shader/shader.vert', 
        'shader/shader.frag'
    );
}

function setup() {
    createCanvas(400, 400, WEBGL);
    // pixelDensity(1);
    
    buffer = createGraphics(400, 400, WEBGL);
    cam = buffer.createCamera();
        
    describe('ascii perlin noise shader test');
    
    frameRate(30);

    start = 0;
    buffer.noFill();
    buffer.strokeWeight(12);
    background(0);
    
    // buffer.noStroke();
    // gfx.noFill();
}

function draw() {
    // clear the off-screen buffer
    background(0);
    buffer.background(0);
    // buffer.background(0);

    buffer.rotateX(0.005);
    buffer.rotateY(-0.0005);
    // buffer.rotateZ(-0.01);

    half_width = 0.5 * width;
    half_height = 0.5 * height;

    let xoff = start;
    buffer.beginShape();
    for (let x = -2*width; x < 2*width; x++) {
        buffer.stroke(255);

        var y = map(
            noise(xoff), 
            0, 1, 
            -height, 
            height
        );
        buffer.vertex(x, y);

        xoff += incr;
    }
    buffer.endShape();

    start += incr;

    // apply the shader to the scene
    shader(sketchShader);

    // pass the off-screen buffer (gfx) as a texture to the shader
    sketchShader.setUniform('iChannel0', buffer);
    sketchShader.setUniform('iResolution', [width, height]);

    // render a rectangle to apply the shader
    rect(0, 0, width, height);
}

// function mouseDragged() {
//   // from the implementation by Paul Wheeler here:
//   // https://stackoverflow.com/a/69006472
//     const deltaTheta = (-sensitivityX * (mouseX - pmouseX)) / scaleFactor;
//     const deltaPhi = (-sensitivityY * (mouseY - pmouseY)) / scaleFactor;
//     cam._orbit(deltaTheta, deltaPhi, 0);
// }

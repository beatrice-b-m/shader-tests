// const sensitivityX = 2;
// const sensitivityY = 1;
// const sensitivityZ = 0.1;
// const scaleFactor = 100;

const incr = .01;

let bufferA;
let bufferB;
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
    
    bufferA = createGraphics(400, 400, WEBGL);
    bufferB = createGraphics(400, 400);
    cam = bufferA.createCamera();
        
    describe('ascii perlin noise shader test');
    
    frameRate(60);

    start = 0;
    bufferA.noFill();
    bufferA.strokeWeight(12);
    background(0);
    
    // buffer.noStroke();
    // gfx.noFill();
}

function draw() {
    // clear the off-screen buffer
    // bufferB.background(0);
    bufferA.background(0, 5);

    half_width = 0.5 * width;
    half_height = 0.5 * height;

    let xoff = start;
    bufferA.beginShape();
    for (let y = -half_height; y < half_height; y++) {
        bufferA.stroke(255);

        var x = map(
            noise(xoff), 
            0, 1, 
            -half_height, 
            half_height
        );
        bufferA.vertex(x, y);

        xoff += incr;
    }
    bufferA.endShape();

    start += incr;

    // write the contents of bufferA to bufferB
    // so we can apply the shader to the trails too
    // bufferB.background(0);
    bufferB.image(bufferA, 0, 0);
    bufferB.filter(ERODE);

    // apply the shader to the scene
    shader(sketchShader);

    // pass the off-screen buffer (gfx) as a texture to the shader
    sketchShader.setUniform('iChannel0', bufferB);
    sketchShader.setUniform('iResolution', [width, height]);

    // render a rectangle to apply the shader
    rect(0, 0, width, height);
}

function mouseDragged() {
  // from the implementation by Paul Wheeler here:
  // https://stackoverflow.com/a/69006472
    const deltaTheta = (-sensitivityX * (mouseX - pmouseX)) / scaleFactor;
    const deltaPhi = (-sensitivityY * (mouseY - pmouseY)) / scaleFactor;
    cam._orbit(deltaTheta, deltaPhi, 0);
}

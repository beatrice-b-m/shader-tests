// const sensitivityX = 2;
// const sensitivityY = 1;
// const sensitivityZ = 0.1;
// const scaleFactor = 100;
const diam = 200;
let img;

// const incr = .05;

// let buffer;
// let start;
// let xoff;
// let cam;

function preload() {
    // load our shader
    sketchShader = loadShader(
        'shader/shader.vert', 
        'shader/shader.frag'
    );
    img = loadImage("data/bliss_fg_small.png");
}

function setup() {
    createCanvas(533, 400, WEBGL);
    // colorMode(HSB, 360, 100, 100, 100);
    describe('ascii bliss shader test');
    
    // rectMode(CENTER);
    // pixelDensity(1);

    buffer = createGraphics(533, 400);
    // cam = buffer.createCamera();
    
    buffer.noStroke();
    
    // buffer.noStroke();
    // gfx.noFill();
}

function draw() {
    background(0);
    let gradient = buffer.drawingContext.createLinearGradient(
        0, height, 0, height/2
    );
    gradient.addColorStop(0, color(33, 94, 236));
    gradient.addColorStop(1, color(131, 160, 224));

    buffer.drawingContext.fillStyle = gradient;
    buffer.rect(0, 0, width, height);
    
    imageFlipped(img, buffer, 0, 0);
    noLoop();
    

    // apply the shader to the scene
    shader(sketchShader);

    // pass the off-screen buffer (gfx) as a texture to the shader
    sketchShader.setUniform('iChannel0', buffer);
    sketchShader.setUniform('iResolution', [width, height]);

    // render a rectangle to apply the shader
    rect(0, 0, width, height);

}

function imageFlipped (img, buf, x, y) {
    buf.push(); 
    buf.scale(1, -1);
    buf.image(img, x, -y-img.height); 
    buf.pop(); 
}



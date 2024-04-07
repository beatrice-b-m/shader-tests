const sensitivityX = 2;
const sensitivityY = 1;
const sensitivityZ = 0.1;
const scaleFactor = 100;

let gfx;
let cam;

function preload() {
    // load our shader
    sketchShader = loadShader(
        'shader/shader.vert', 
        'shader/shader.frag'
    );
}

function setup() {
    createCanvas(400, 400, WEBGL);
    pixelDensity(1);
    
    gfx = createGraphics(400, 400, WEBGL);
    cam = gfx.createCamera();
        
    describe('ascii cube shader test');
    
    frameRate(30); 
    
    gfx.noStroke();
    gfx.noFill();
}

function draw() {
    // clear the off-screen buffer
    gfx.background(0);
    gfx.ambientLight(100);
    
    // apply a slight constant rotation
    gfx.rotateX(0.002);
    gfx.rotateY(-0.006);
    
    // draw a box
    customBox(gfx, 150, 150, 150);

    // apply the shader to the scene
    shader(sketchShader);

    // pass the off-screen buffer (gfx) as a texture to the shader
    sketchShader.setUniform('iChannel0', gfx);
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

function customBox(g, w, h, d) {
    // front face
    g.fill('red');
    g.beginShape();
    g.vertex(-w/2, -h/2, d/2);
    g.vertex(w/2, -h/2, d/2);
    g.vertex(w/2, h/2, d/2);
    g.vertex(-w/2, h/2, d/2);
    g.endShape(CLOSE);

    // back face
    g.fill('green');
    g.beginShape();
    g.vertex(-w/2, -h/2, -d/2);
    g.vertex(w/2, -h/2, -d/2);
    g.vertex(w/2, h/2, -d/2);
    g.vertex(-w/2, h/2, -d/2);
    g.endShape(CLOSE);

    // right face
    g.fill('blue');
    g.beginShape();
    g.vertex(w/2, -h/2, d/2);
    g.vertex(w/2, -h/2, -d/2);
    g.vertex(w/2, h/2, -d/2);
    g.vertex(w/2, h/2, d/2);
    g.endShape(CLOSE);

    // left face
    g.fill('yellow');
    g.beginShape();
    g.vertex(-w/2, -h/2, d/2);
    g.vertex(-w/2, -h/2, -d/2);
    g.vertex(-w/2, h/2, -d/2);
    g.vertex(-w/2, h/2, d/2);
    g.endShape(CLOSE);

    // top face
    g.fill('cyan');
    g.beginShape();
    g.vertex(-w/2, -h/2, -d/2);
    g.vertex(w/2, -h/2, -d/2);
    g.vertex(w/2, -h/2, d/2);
    g.vertex(-w/2, -h/2, d/2);
    g.endShape(CLOSE);

    // bottom face
    g.fill('magenta');
    g.beginShape();
    g.vertex(-w/2, h/2, -d/2);
    g.vertex(w/2, h/2, -d/2);
    g.vertex(w/2, h/2, d/2);
    g.vertex(-w/2, h/2, d/2);
    g.endShape(CLOSE);
}
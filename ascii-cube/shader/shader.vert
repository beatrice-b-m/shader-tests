#version 300 es
precision mediump float;

in vec3 aPosition;
in vec2 aTexCoord;

out vec2 vTexCoord;

void main() {
    // map our attribute var to a varying var to pass to our frag shader
    vTexCoord = aTexCoord;
    
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}
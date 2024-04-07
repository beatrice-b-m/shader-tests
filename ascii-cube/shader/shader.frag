#version 300 es
precision mediump float;

// adapted from https://www.shadertoy.com/view/lssGDj
// huge thanks to movAX13h for their work, please check 
// their blog post about it here!
// https://blog.thrill-project.com/ascii-art-shader/

uniform sampler2D iChannel0;
uniform vec2 iResolution;

in vec2 vTexCoord;
out vec4 fragColor;

float character(int n, vec2 p)
{
	p = floor(p*vec2(-4.0, 4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
	{
        if (clamp(p.y, 0.0, 4.0) == p.y)	
		{
        	int a = int(floor(p.x + 0.5) + 5.0 * floor(p.y + 0.5));
			if (((n >> a) & 1) == 1) return 1.0;
		}	
    }
	return 0.0;
}

void main() {
    // Start with correctly oriented UV coordinates
    vec2 uv = vTexCoord;

    // Apply pixelation
    // Adjust the pixelation scale as needed
    float pixelSizeX = 8.0 / iResolution.x;
    float pixelSizeY = 8.0 / iResolution.y;
    vec2 pixelatedUV = vec2(
        floor(uv.x / pixelSizeX) * pixelSizeX,
        floor(uv.y / pixelSizeY) * pixelSizeY
    );

    vec3 col = texture(iChannel0, pixelatedUV).rgb;

    float gray = (col.r + col.g + col.b) / 3.;

    int n =  4096;

    // limited character set
    if (gray > 0.2) n = 65600;    // :
    if (gray > 0.3) n = 163153;   // *
    if (gray > 0.4) n = 15255086; // o 
    if (gray > 0.5) n = 13121101; // &
    if (gray > 0.6) n = 15252014; // 8
    if (gray > 0.7) n = 13195790; // @
    if (gray > 0.8) n = 11512810; // #

    vec2 p = mod(gl_FragCoord.xy/4.0, 2.0) - vec2(1.0);

    col = col*character(n, p);

    fragColor = vec4(col, 1.0);
}
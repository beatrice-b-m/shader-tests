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

    vec4 col = texture(iChannel0, pixelatedUV).rgba;
    // vec4 col = texture(iChannel0, uv).rgba;

//     float gray = (col.r + col.g + col.b) / 3.;

//     int n =  4096;

//    // full character set including A-Z and 0-9
//     if (gray > 0.0233) n = 4096;
//     if (gray > 0.0465) n = 131200;
//     if (gray > 0.0698) n = 4329476;
//     if (gray > 0.0930) n = 459200;
//     if (gray > 0.1163) n = 4591748;
//     if (gray > 0.1395) n = 12652620;
//     if (gray > 0.1628) n = 14749828;
//     if (gray > 0.1860) n = 18393220;
//     if (gray > 0.2093) n = 15239300;
//     if (gray > 0.2326) n = 17318431;
//     if (gray > 0.2558) n = 32641156;
//     if (gray > 0.2791) n = 18393412;
//     if (gray > 0.3023) n = 18157905;
//     if (gray > 0.3256) n = 17463428;
//     if (gray > 0.3488) n = 14954572;
//     if (gray > 0.3721) n = 13177118;
//     if (gray > 0.3953) n = 6566222;
//     if (gray > 0.4186) n = 16269839;
//     if (gray > 0.4419) n = 18444881;
//     if (gray > 0.4651) n = 18400814;
//     if (gray > 0.4884) n = 33061392;
//     if (gray > 0.5116) n = 15255086;
//     if (gray > 0.5349) n = 32045584;
//     if (gray > 0.5581) n = 18405034;
//     if (gray > 0.5814) n = 15022158;
//     if (gray > 0.6047) n = 15018318;
//     if (gray > 0.6279) n = 16272942;
//     if (gray > 0.6512) n = 18415153;
//     if (gray > 0.6744) n = 32641183;
//     if (gray > 0.6977) n = 32540207;
//     if (gray > 0.7209) n = 18732593;
//     if (gray > 0.7442) n = 18667121;
//     if (gray > 0.7674) n = 16267326;
//     if (gray > 0.7907) n = 32575775;
//     if (gray > 0.8140) n = 15022414;
//     if (gray > 0.8372) n = 15255537;
//     if (gray > 0.8605) n = 32032318;
//     if (gray > 0.8837) n = 32045617;
//     if (gray > 0.9070) n = 33081316;
//     if (gray > 0.9302) n = 32045630;
//     if (gray > 0.9535) n = 33061407;
//     if (gray > 0.9767) n = 11512810;

//     vec2 p = mod(gl_FragCoord.xy/4.0, 2.0) - vec2(1.0);

//     col = col*character(n, p);

    fragColor = vec4(col);
}
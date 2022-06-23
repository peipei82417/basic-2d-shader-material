import * as THREE from "three";
import { extend } from "@react-three/fiber";

class BoxBlurShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            uniforms: {
                u_resolution: { value: new THREE.Vector2() },
                u_texture: { value: new THREE.Texture() },
                u_blurRadius: { value: 1.0 },
            },
            vertexShader: `
                precision mediump float;
    
                varying vec2 v_uv;
            
                void main() {
                    v_uv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
            fragmentShader: `
                precision mediump float;

                varying vec2 v_uv;

                uniform vec2 u_resolution;
                uniform sampler2D u_texture;
                uniform float u_blurRadius;

                void main() {
                    float size = floor(u_blurRadius * 6.0 + 1.0);
                    float blurRadius = floor(size / 2.0);

                    vec2 unit = 1.0 / u_resolution; //單位座標
                    vec4 color = vec4(0.0);

                    float count = pow((2. * blurRadius + 1.), 2.);

                    for(float x = -blurRadius; x <= blurRadius; ++x) {
                        for(float y = -blurRadius; y <= blurRadius; ++y) {   
                            color += texture2D(u_texture, v_uv + vec2(unit.x * x, unit.y * y));
                        }
                    }

                    gl_FragColor = vec4(color.rgba / count);
                }`,
        });
    }

    set u_texture(value) {
        this.uniforms.u_texture.value = value;
    }

    set u_resolution(value) {
        this.uniforms.u_resolution.value = value;
    }

    set u_blurRadius(value) {
        this.uniforms.u_blurRadius.value = value;
    }
}

extend({ BoxBlurShaderMaterial });

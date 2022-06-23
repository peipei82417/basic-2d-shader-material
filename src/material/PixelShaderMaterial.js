import * as THREE from "three";
import { extend } from "@react-three/fiber";

class PixelShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            uniforms: {
                u_texture: { value: new THREE.Texture() },
                u_resolution: { value: new THREE.Vector2() },
                u_pixelSize: { value: 3 },
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

                uniform sampler2D u_texture;
                uniform vec2 u_resolution;
                uniform float u_pixelSize;

                void main() {
                    float x = v_uv.x * u_resolution.x;
                    float y = v_uv.y * u_resolution.y;

                    x = floor(x / u_pixelSize) * u_pixelSize;
                    y = floor(y / u_pixelSize) * u_pixelSize;

                    x = x / u_resolution.x;
                    y = y / u_resolution.y;

                    vec4 color = texture2D(u_texture, vec2(x,y));
                    gl_FragColor = color; 
                }
            `,
        });
    }

    set u_texture(value) {
        this.uniforms.u_texture.value = value;
    }

    set u_resolution(value) {
        this.uniforms.u_resolution.value = value;
    }

    set u_pixelSize(value) {
        this.uniforms.u_pixelSize.value = value;
    }
}

extend({ PixelShaderMaterial });

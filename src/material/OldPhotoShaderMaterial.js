import * as THREE from "three";
import { extend } from "@react-three/fiber";

class OldPhotoShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            uniforms: {
                u_texture: { value: new THREE.Texture() },
                u_resolution: { value: new THREE.Vector2() },
                u_oldLevel: { value: 1.0 },
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
                uniform float u_oldLevel;

                vec4 getOldPhotoColor(vec4 color) {
                    float r = 0.393 * color.r + 0.769 * color.g + 0.189 * color.b; 
                    float g = 0.349 * color.r + 0.686 * color.g + 0.168 * color.b; 
                    float b = 0.272 * color.r + 0.534 * color.g + 0.131 * color.b;

                    return vec4(r, g, b, color.a);
                }

                void main() {
                    vec4 srcColor = texture2D(u_texture, v_uv.xy);
                    vec4 oldColor = getOldPhotoColor(srcColor);

                    // vec4 color = srcColor + (oldColor - srcColor) * u_oldLevel;
                    vec4 color = mix(srcColor, oldColor, u_oldLevel);
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

    set u_oldLevel(value) {
        this.uniforms.u_oldLevel.value = value;
    }
}

extend({ OldPhotoShaderMaterial });

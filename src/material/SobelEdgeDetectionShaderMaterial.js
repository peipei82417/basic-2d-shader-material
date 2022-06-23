import * as THREE from "three";
import { extend } from "@react-three/fiber";

class SobelEdgeDetectionShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            uniforms: {
                u_texture: { value: new THREE.Texture() },
                u_resolution: { value: new THREE.Vector2() },
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
                
                void main() {
                    vec2 p = u_resolution;
                    
                    vec4 p0 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(-1.0, 1.0)));
                    vec4 p1 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(0.0, 1.0)));
                    vec4 p2 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(1.0, 1.0)));
                    vec4 p3 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(-1.0, 0.0)));
                    vec4 p4 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(0.0, 0.0)));
                    vec4 p5 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(1.0, 0.0)));
                    vec4 p6 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(-1.0, -1.0)));
                    vec4 p7 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(0.0, -1.0)));
                    vec4 p8 = texture2D(u_texture, v_uv + 1.0 / (p + vec2(1.0, -1.0)));

                    /**
                     * 索伯算子公式: https://zh.m.wikipedia.org/zh-tw/%E7%B4%A2%E8%B2%9D%E7%88%BE%E7%AE%97%E5%AD%90
                     */
                    // Gx = [
                    //     -1, 0, +1,
                    //     -2, 0, +2,
                    //     -1, 0, +1
                    // ];
                    // Gy = [
                    //     +1, +2, +1,
                    //      0,  0,  0,
                    //     -1, -2, -1
                    // ];

                    // | G | =  
                    //    | (p0 + (2.0 * p1) + p2) - (p6 + (2.0 * p7) + p8) |
                    //                             + 
                    //    | (p2 + (2.0 * p5) + p8) - (p0 + (2.0 * p3) + p6) |

                    vec4 color =
                        abs((p0 + (2. * p1) + p2) - (p6 + (2. * p7) + p8)) + 
                        abs((p2 + (2. * p5) + p8) - (p0 + (2. * p3) + p6));

                    if(color.a == 0.){
                        return;
                    }

                    gl_FragColor = vec4(1. - color);
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
}

extend({ SobelEdgeDetectionShaderMaterial });

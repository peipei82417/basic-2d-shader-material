import * as THREE from "three";
import { extend } from "@react-three/fiber";

class GaussBlurShaderMaterial extends THREE.ShaderMaterial {
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

                #define e 2.718281828459045
                #define PI 3.141592653589793

                varying vec2 v_uv;

                uniform vec2 u_resolution;
                uniform sampler2D u_texture;
                uniform float u_blurRadius;

                /**
                 * 高斯函数公式: https://zh.wikipedia.org/wiki/%E9%AB%98%E6%96%AF%E6%A8%A1%E7%B3%8A 
                 */
                float getWeight(float x, float y) {
                    return (1.0 / (2.0 * PI * pow(u_blurRadius, 2.0))) * pow(1.0 / e, (pow(x, 2.0) + pow(y, 2.0)) / (2.0 * pow(u_blurRadius, 2.0)));
                }

                void main () {
                    float size = floor(u_blurRadius * 6.0 + 1.0);
                    float blurRadius = floor(size / 2.0);

                    // 原點
                    float totalWeight = getWeight(0.0, 0.0);

                    for(float x = 1.0; x <= blurRadius; x++) {
                        totalWeight += getWeight(x, 0.0) * 2.0;
                    } 

                    for(float y = 1.0; y <= blurRadius; y++) {
                        totalWeight += getWeight(0.0, y) * 2.0;
                    } 

                    for(float x = 1.0; x <= blurRadius; x++) {
                        for (float y = 1.0; y<= blurRadius; y++) {
                            totalWeight += getWeight(x, y) * 4.0;
                        }
                    }

                    vec4 color = vec4(0.0);

                    vec2 unit = 1.0 / u_resolution;

                    for(float x = -blurRadius; x <= blurRadius; ++x) {
                        for (float y = -blurRadius; y <= blurRadius; ++y) {
                            // 求出對應座標的權重
                            float weight = getWeight(x, y) / totalWeight;
                    
                            // 求出對應座標像素顏色的加權值
                            color += texture2D(u_texture, v_uv + vec2(unit.x * x, unit.y * y)) * weight;
                        }
                    }
                    gl_FragColor = color;
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

extend({ GaussBlurShaderMaterial });

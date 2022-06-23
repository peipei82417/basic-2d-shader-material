import * as THREE from "three";
import { extend } from "@react-three/fiber";

class WaveShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            transparent: true,
            uniforms: {
                u_texture: { value: new THREE.Texture() },
                u_resolution: { value: new THREE.Vector2() },
                u_time: { value: 0 },
                u_rotated: { value: 0 },
                u_txy: { value: new THREE.Vector2() },
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

                in vec2 v_uv;

                uniform sampler2D u_texture;
                uniform vec2 u_resolution;
                uniform float u_time;
                uniform float u_rotated;
                uniform vec2 u_txy;

                #define F cos(x - y) * cos(y), sin(x + y) * sin(y)

                vec2 s(vec2 p) {
                    float d = u_time * 0.2;
                    float x = u_txy.x * (p.x + d);
                    float y = u_txy.y * (p.y + d);
                    return vec2(F);
                }
              
                void main() {
                    vec2 rs = u_resolution;
                    vec2 q = v_uv + 2. / rs.x * (s(v_uv) - s(v_uv + rs));

                    // 反轉y
                    // q.y = 1. - q.y;

                    vec4 color = texture2D(u_texture, q);



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

    set u_time(value) {
        this.uniforms.u_time.value = value;
    }

    set u_rotated(value) {
        this.uniforms.u_rotated.value = value;
    }

    set u_txy(value) {
        this.uniforms.u_txy.value = value;
    }
}

extend({ WaveShaderMaterial });

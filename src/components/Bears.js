import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import bearUrl from "../assets/bear.png";
import "../material/BoxBlurShaderMaterial";
import "../material/GaussBlurShaderMaterial";
import "../material/PixelShaderMaterial";
import "../material/OldPhotoShaderMaterial";
import "../material/WaveShaderMaterial";
import "../material/SobelEdgeDetectionShaderMaterial";

export const BoxBlurBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);
    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;
    return (
        <mesh position={new THREE.Vector3(-120, 40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <boxBlurShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
                u_blurRadius={1}
            />
        </mesh>
    );
};

export const GaussBlurBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);
    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;
    return (
        <mesh position={new THREE.Vector3(-40, 40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <gaussBlurShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
                u_blurRadius={2.0}
            />
        </mesh>
    );
};

export const MosaicBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);
    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;
    return (
        <mesh position={new THREE.Vector3(40, 40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <pixelShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
                u_pixelSize={1.5}
            />
        </mesh>
    );
};

export const OldPhotoBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);
    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;
    return (
        <mesh position={new THREE.Vector3(120, 40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <oldPhotoShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
                u_oldLevel={1}
            />
        </mesh>
    );
};

export const WaveBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);

    useFrame(({ clock }) => (ref.current.u_time = clock.getElapsedTime()));

    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;

    return (
        <mesh position={new THREE.Vector3(-120, -40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <waveShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
                u_txy={new THREE.Vector2(8, 8)}
            />
        </mesh>
    );
};

export const SobelEdgeDetectionBear = () => {
    const ref = useRef();
    const [texture] = useLoader(THREE.TextureLoader, [bearUrl]);

    const w = texture.source.data.width / 12;
    const h = texture.source.data.height / 12;

    return (
        <mesh position={new THREE.Vector3(-40, -40, 0)}>
            <planeBufferGeometry args={[w, h]} />
            <sobelEdgeDetectionShaderMaterial
                ref={ref}
                u_texture={texture}
                u_resolution={new THREE.Vector2(w, h)}
            />
        </mesh>
    );
};

const Bears = () => {
    return (
        <>
            <BoxBlurBear />
            <GaussBlurBear />
            <MosaicBear />
            <OldPhotoBear />
            <WaveBear />
            <SobelEdgeDetectionBear />
        </>
    );
};

export default Bears;

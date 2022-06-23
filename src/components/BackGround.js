import bgUrl from "../assets/bg.png";
import { useRef } from "react";
import { useAspect, useTexture } from "@react-three/drei";
export const BackGround = () => {
    const size = useAspect(1600, 1000, 1.01);
    const ref = useRef();
    const texture = useTexture(bgUrl);

    return (
        <mesh scale={size}>
            <planeBufferGeometry />
            <meshBasicMaterial ref={ref} map={texture} />
        </mesh>
    );
};

export default BackGround;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import BackGround from "./components/BackGround";
import Bears from "./components/Bears";
import { OrbitControls } from "@react-three/drei";

const App = () => {
    return (
        <Canvas
            linear
            orthographic
            gl={{
                antialias: false,
                stencil: false,
                alpha: false,
                depth: false,
            }}
            camera={{ zoom: 3, position: [0, 0, 300], far: 5000, near: 0 }}
        >
            {/* <color attach="background" args={["blue"]} /> */}
            <Suspense fallback={null}>
                <BackGround />
                <Bears />
            </Suspense>
            <OrbitControls target={[0, 0, 0]} enableRotate={false} />
        </Canvas>
    );
};

export default App;

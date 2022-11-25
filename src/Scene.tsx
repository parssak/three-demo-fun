import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore
  useFrame((state, delta) => (ref.current?.lookAt(state.camera.position)));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={new THREE.Color(0xffffff)} />
    </mesh>
  );
}

export const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} color={new THREE.Color(0x00ff00)} />
      <pointLight position={[0, 0, 0]} color={new THREE.Color(0x0000ff)} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Box position={[0, 1.2, 0]} />
      <Box position={[0, -1.2, 0]} />
    </Canvas>
  );
};

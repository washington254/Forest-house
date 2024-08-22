import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Sky } from '@react-three/drei'
import { House } from './components/House'
import Ground from './components/Ground'
import Forest from './components/Forest'
import { DepthOfField, EffectComposer, Noise, Vignette,ToneMapping  } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <fog attach="fog" args={["#87CEEB", 350, 500]} /> Add fog here
  
      
        <Environment preset='sunset'/>
        <Suspense fallback={null}>
        <House scale={[45, 45, 45]} position={[0,-1.5,0]} />
    
        <Forest
            numTrees={1000}
            innerRadius={100}
            outerRadius={680}
            position={[0,-3,0]}
          />

        <Ground />
        </Suspense>
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={ -Math.PI / 2}
      />
    <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Noise opacity={0.03} />
        <Vignette
        offset={0.5} // vignette offset
        darkness={0.5} // vignette darkness
        eskil={false} // Eskil's vignette technique
        blendFunction={BlendFunction.NORMAL} // blend mode
      />
      </EffectComposer>
    </Canvas>
  )
}
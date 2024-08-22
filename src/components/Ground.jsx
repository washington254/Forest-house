import React from 'react'
import { Plane } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Ground = () => {
  // Load the texture
  const colorMap = useLoader(THREE.TextureLoader, '/ground/color.jpg')

  // Set texture wrapping and repeat
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(20, 20) // Adjust repeat to your needs

  return (
    <Plane args={[1500, 1500]} position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial
        map={colorMap}
        side={THREE.DoubleSide}
      />
    </Plane>
  )
}

export default Ground

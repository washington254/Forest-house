import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Instance, Instances, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Forest({
  numTrees,
  innerRadius,
  outerRadius,
  position,
}) {
  const { camera } = useThree()

  const ref = useRef()

  const particles = useMemo(() => {
    return Array.from({ length: numTrees }, (_, index) => {
      const angle = (index / numTrees) * Math.PI * 2
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = radius * Math.cos(angle)
      const z = radius * Math.sin(angle)
      const y = 0
      const scale =
        2 + Math.random() * 3.5 * Math.random() * Math.random() * 2.5
      return { x, y, z, scale }
    })
  }, [numTrees, innerRadius, outerRadius])

  const texture = useTexture('/tree1.png')
  texture.flipY = false

  useFrame(() => {
    if (ref.current) {
      ref.current.children.forEach((child) => {
        if (child) {
          child.lookAt(camera.position)
          child.needsUpdate = true
        }
      })
    }
  })

  return (
    <group position={position}>
      <Instances
        castShadow
        receiveShadow
        ref={ref}
        limit={2000}
        frustumCulled={false}
        renderOrder={2}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial
          map={texture}
          color={0xffff00}
          transparent
          side={THREE.DoubleSide}
          depthWrite={true}
          alphaTest={0.2}
        />
        {particles.map((data, i) => (
          <Instance
            key={i}
            position={[data.x, data.y, data.z]}
            scale={[data.scale, data.scale, 1]}
          />
        ))}
      </Instances>
    </group>
  )
}

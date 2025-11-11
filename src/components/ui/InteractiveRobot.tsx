'use client'

import { SplineScene } from "@/components/ui/splite";

export function InteractiveRobot() {
  return (
    <div className="w-full h-full relative" style={{ background: 'transparent' }}>
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}

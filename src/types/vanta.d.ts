declare module 'vanta/dist/vanta.halo.min' {
  import { Object3D } from 'three'

  interface VantaHaloOptions {
    el: HTMLElement
    THREE: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    baseColor?: number
    backgroundColor?: number
    amplitudeFactor?: number
    xOffset?: number
    yOffset?: number
    size?: number
  }

  interface VantaHaloEffect extends Object3D {
    destroy: () => void
  }

  function HALO(options: VantaHaloOptions): VantaHaloEffect

  export default HALO
}

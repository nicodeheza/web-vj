import type { Texture } from '@pixi/webworker'

export interface Frame {
	time: number
	image: EncodedImage
}

export interface PixiFrame {
	time: number
	texture: Texture
}
export type EncodedImage = string

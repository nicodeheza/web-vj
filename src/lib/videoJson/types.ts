export interface PlayerOptions {
	loop?: boolean
	autoPlay?: boolean
}

export interface Frame {
	time: number
	image: EncodedImage
}
export type EncodedImage = string

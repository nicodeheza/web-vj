import { verbs, adjetives, nouns } from './words'

export function getRandomWords() {
	const verb = verbs[Math.floor(Math.random() * verbs.length)]
	const adjetive = adjetives[Math.floor(Math.random() * adjetives.length)]
	const noun = nouns[Math.floor(Math.random() * nouns.length)]

	return `${verb} ${adjetive} ${noun}`
}

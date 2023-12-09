import type { Action } from '../types'

export type Handlers = Record<string, (payload: Action['payload']) => void>

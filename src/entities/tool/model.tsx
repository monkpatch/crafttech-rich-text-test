import { createEvent, restore } from 'effector'

export type Tool = 'cursor' | 'shape'

export const setActiveTool = createEvent<Tool>('setActiveTool')

export const $activeTool = restore(setActiveTool, 'cursor')

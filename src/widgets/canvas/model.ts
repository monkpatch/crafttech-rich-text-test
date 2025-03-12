import {
  combine,
  createApi,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector'
import { Figure, FigureID } from '../../entities/figure'
import { $activeTool } from '../../entities/tool'

export const $figures = createStore<Figure[]>([])

export const { addFigure, setFigure, removeFigure } = createApi($figures, {
  addFigure: (figures, figure: Figure) => [...figures, figure],
  setFigure: (figures, figure: Figure) =>
    figures.map((f) => (f.id === figure.id ? figure : f)),
  removeFigure: (figures, id: string) => figures.filter((f) => f.id !== id),
})

export const setActiveFigureID = createEvent<FigureID | null>('setActiveFigure')

export const $activeFigureID = restore(setActiveFigureID, null)

export const $activeFigure = combine(
  $figures,
  $activeFigureID,
  (figures, activeFigureID) =>
    (activeFigureID && figures.find((f) => f.id === activeFigureID)) || null,
)

sample({
  clock: $activeTool,
  fn: () => null,
  target: $activeFigureID,
})

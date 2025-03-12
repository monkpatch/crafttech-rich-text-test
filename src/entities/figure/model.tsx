export type FigureID = string

export type Figure = {
  id: FigureID
  width: number
  height: number
  type: string
  x: number
  y: number
  html?: string
  text?: string
  image?: string
}

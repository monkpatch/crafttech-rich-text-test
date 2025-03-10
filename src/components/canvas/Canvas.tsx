import { useState } from 'react'
import { Layer, Stage } from 'react-konva'
import Shape from '../shape/Shape'
import { Figure, Tool } from '../../types'

export type CanvasProps = {
  activeTool: Tool
  stageRef: Parameters<typeof Stage>[0]['ref']
}

const Canvas = ({ activeTool, stageRef }: CanvasProps) => {
  const [figures, setFigures] = useState<Figure[]>([])

  const handleOnClick = (e: any) => {
    if (activeTool !== 'shape') return

    const stage = e.target.getStage()
    const stageOffset = stage.absolutePosition()
    const point = stage.getPointerPosition()
    setFigures((prev: Figure[]) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: 'rect',
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: '',
        text: '',
      },
    ])
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={activeTool === 'cursor'}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: Figure, i: number) => {
          return (
            <Shape key={i} {...figure} stageRef={stageRef} tool={activeTool} />
          )
        })}
      </Layer>
    </Stage>
  )
}

export default Canvas

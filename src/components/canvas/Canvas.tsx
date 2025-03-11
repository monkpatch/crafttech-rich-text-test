import { useState } from 'react'
import { Layer, Stage } from 'react-konva'
import Shape from '../shape/Shape'
import { Figure } from '../../types'
import { useAppState } from '../../hooks/useAppState'

const Canvas = () => {
  const [figures, setFigures] = useState<Figure[]>([])
  const { activeTool, stageRef } = useAppState()

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

  const handleFigureUpdate = (figure: Figure) => {
    setFigures((prev: Figure[]) => {
      const figures = [...prev]
      const idx = figures.findIndex((f) => f.id === figure.id)
      if (idx >= 0) figures[idx] = figure
      return figures
    })
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
        {figures.map((figure: Figure) => {
          return (
            <Shape
              key={figure.id}
              figure={figure}
              onFigureUpdate={handleFigureUpdate}
            />
          )
        })}
      </Layer>
    </Stage>
  )
}

export default Canvas

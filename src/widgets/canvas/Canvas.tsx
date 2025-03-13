import { useRef } from 'react'
import { Layer, Stage } from 'react-konva'
import {
  $activeFigureID,
  $figures,
  addFigure,
  setActiveFigureID,
  setFigure,
} from './model'
import { useUnit } from 'effector-react'
import { $activeTool } from '../../entities/tool'
import Konva from 'konva'
import { FigureView } from '../../features/figure-view'

export const Canvas = () => {
  const activeTool = useUnit($activeTool)
  const stageRef = useRef<Konva.Stage>(null)
  const activeFigureID = useUnit($activeFigureID)
  const figures = useUnit($figures)

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'shape') {
      setActiveFigureID(null)
      return
    }

    const stage = e.target.getStage()
    if (!stage) return

    const stageOffset = stage.absolutePosition()
    const point = stage.getPointerPosition()
    if (!point) return

    const id = Date.now().toString(36)

    addFigure({
      id: id,
      width: 100,
      height: 100,
      type: 'rect',
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
    })

    setActiveFigureID(id)
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
        {figures.map((figure) => (
          <FigureView
            key={figure.id}
            figure={figure}
            onChange={setFigure}
            onFocus={() => setActiveFigureID(figure.id)}
            isActive={figure.id === activeFigureID}
          />
        ))}
      </Layer>
    </Stage>
  )
}

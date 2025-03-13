import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAdd,
  faMousePointer,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { $activeTool, setActiveTool, Tool } from '@/entities/tool'
import { useUnit } from 'effector-react'
import './ToolPicker.scss'

export const ToolPicker = () => {
  const activeTool = useUnit($activeTool)

  const toolIcons: Record<Tool, IconDefinition> = {
    shape: faAdd,
    cursor: faMousePointer,
  }

  return (
    <div className="tool-picker">
      {Object.entries(toolIcons).map(([tool, icon]) => {
        return (
          <button
            onClick={() => setActiveTool(tool as Tool)}
            className={tool === activeTool ? 'active' : ''}
            key={tool}
          >
            <FontAwesomeIcon icon={icon} className="button-icon" />
          </button>
        )
      })}
    </div>
  )
}

export default ToolPicker

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type Tool } from '../../types'
import {
  faAdd,
  faMousePointer,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import './toolPicker.scss'
import { useActiveTool } from '../../hooks/useAppState'

export type ControlProps = {
  onToolChange: (tool: Tool) => void
}

const ToolPicker = ({ onToolChange }: ControlProps) => {
  const activeTool = useActiveTool()

  const toolIcons: Record<Tool, IconDefinition> = {
    shape: faAdd,
    cursor: faMousePointer,
  }

  return (
    <div className="control">
      {Object.entries(toolIcons).map(([tool, icon]) => {
        return (
          <button
            onClick={() => onToolChange(tool as Tool)}
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

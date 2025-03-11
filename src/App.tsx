import { useRef, useState } from 'react'
import './App.css'
import Canvas from './components/canvas/Canvas'
import ToolPicker from './components/toolPicker/ToolPicker.tsx'
import { Tool } from './types'
import { AppStateContext } from './hooks/useAppState'

function App() {
  const [activeTool, setActiveTool] = useState<Tool>('shape')
  const stageRef = useRef(null)

  return (
    <>
      <AppStateContext.Provider value={{ activeTool, stageRef }}>
        <Canvas />
        <ToolPicker onToolChange={setActiveTool} />
      </AppStateContext.Provider>
    </>
  )
}

export default App

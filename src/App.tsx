import { useRef, useState } from 'react'
import './App.css'
import Canvas from './components/canvas/Canvas'
import Control from './components/control/Control'
import { Tool } from './types'

function App() {
  const [tool, setTool] = useState<Tool>('cursor')
  const stageRef = useRef(null)
  return (
    <>
      <Canvas activeTool={tool} stageRef={stageRef} />
      <Control activeTool={tool} onToolChange={setTool} />
    </>
  )
}

export default App

import { useRef, useState } from 'react'
import './App.css'
import Canvas from './components/canvas/Canvas'
import Control from './components/control/Control'

function App() {
  const [tool, setTool] = useState('cursor')
  const stageRef = useRef(null)
  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </>
  )
}

export default App

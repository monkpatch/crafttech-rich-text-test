import React, { useContext } from 'react'
import { Tool } from '../types'
import { Stage } from 'react-konva'

export type AppState = {
  activeTool: Tool
  stageRef: Parameters<typeof Stage>[0]['ref']
}

export const AppStateContext = React.createContext<AppState>({
  activeTool: 'cursor',
  stageRef: null,
})

export const useAppState = () => useContext(AppStateContext)
export const useActiveTool = () => useContext(AppStateContext).activeTool
export const useStageRef = () => useContext(AppStateContext).stageRef

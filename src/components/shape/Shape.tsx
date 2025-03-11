import html2canvas from 'html2canvas'
import Konva from 'konva'
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react'
import { Group, Image, Rect } from 'react-konva'
import { Html } from 'react-konva-utils'
import { KonvaEventObject } from 'konva/lib/Node'
import { useActiveTool } from '../../hooks/useAppState'
import { Figure } from '../../types'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './shape.scss'

export type ShapeProps = {
  figure: Figure
  onFigureUpdate: (figure: Figure) => void
}

const Shape = ({ figure, onFigureUpdate }: ShapeProps) => {
  const activeTool = useActiveTool()
  const editor = useEditor({ content: figure.text, extensions: [StarterKit] })
  const [isEditing, setIsEditing] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<any>(null)
  const imageRef = useRef<any>(null)

  const handleClick = async () => {
    if (activeTool === 'shape') {
      return
    } else {
      setIsEditing(true)
      editor?.commands.focus()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    onFigureUpdate({
      ...figure,
      text: e.target.innerText,
      html: e.target.innerHTML,
    })
  }

  const handleDragEng = (e: KonvaEventObject<DragEvent>) => {
    onFigureUpdate({
      ...figure,
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const handleBlur = async (e: FocusEvent<HTMLDivElement>) => {
    const canvas = await html2canvas(e.target, {
      backgroundColor: 'transparent',
    })
    imageRef.current = canvas
    setIsEditing(false)
  }

  return (
    <>
      <Group
        x={figure.x}
        y={figure.y}
        onClick={handleClick}
        ref={groupRef}
        draggable
        onDragEnd={handleDragEng}
      >
        <Rect
          stroke={'black'}
          strokeWidth={2}
          width={figure.width}
          height={figure.height}
        />
        {isEditing ? (
          <Html>
            <EditorContent
              style={{
                width: figure.width - 8,
                height: figure.height - 8,
              }}
              spellCheck={false}
              className="editor"
              editor={editor}
              ref={editorRef}
              content={figure.html}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Html>
        ) : (
          <Image image={imageRef.current} x={4} y={3}></Image>
        )}
      </Group>
    </>
  )
}

export default Shape

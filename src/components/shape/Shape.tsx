import html2canvas from 'html2canvas'
import Konva from 'konva'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Group, Rect } from 'react-konva'
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

  const groupRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${figure.id}`)
    if (htmltext) {
      const innerhtml = htmltext.innerHTML
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: 'rgba(0,0,0,0)',
        })
        const shape = new Konva.Image({
          x: 0,
          y: figure.height / 2,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        })
        groupRef.current.add(shape)
        imageRef.current = shape
      } else return
    } else return
  }

  useEffect(() => {
    renderImage()
  }, [])

  const handleClick = () => {
    if (activeTool === 'shape') {
      return
    } else {
      setIsEditing((prev) => !prev)
      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show()
        } else {
          imageRef.current.hide()
        }
      } else return
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
        <Rect stroke={'black'} width={figure.width} height={figure.height} />
        {isEditing && (
          <Html>
            <EditorContent
              style={{
                width: figure.width,
                height: figure.height,
                overflow: 'hidden',
              }}
              className="editor"
              editor={editor}
              content={figure.html}
              onChange={handleChange}
            />
          </Html>
        )}
      </Group>
    </>
  )
}

export default Shape

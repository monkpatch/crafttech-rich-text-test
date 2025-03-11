import html2canvas from 'html2canvas'
import Konva from 'konva'
import { useEffect, useRef, useState } from 'react'
import { Group, Rect } from 'react-konva'
import { Html } from 'react-konva-utils'
import HtmlText from '../htmlText/HtmlText'
import { KonvaEventObject } from 'konva/lib/Node'
import { useActiveTool } from '../../hooks/useAppState'

const Shape = (props: any) => {
  const { x, y, width, height, html, id, text } = props
  const activeTool = useActiveTool()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(text)

  const groupRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const htmlRef = useRef<any>(null)
  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${id}`)
    if (htmltext) {
      const innerhtml = htmltext.innerHTML
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: 'rgba(0,0,0,0)',
        })
        const shape = new Konva.Image({
          x: 0,
          y: height / 2,
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

  const handleInput = (e: any) => {
    setValue(e.target.value)
  }

  const handleDragEng = (_: KonvaEventObject<DragEvent>) => {
    // e.target.x()
  }

  return (
    <>
      <Group
        x={x}
        y={y}
        onClick={handleClick}
        ref={groupRef}
        draggable
        onDragEnd={handleDragEng}
      >
        <Rect stroke={'black'} width={width} height={height} />
        {isEditing && (
          <Html>
            <textarea value={value} onChange={handleInput} />
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={html} id={id} />
      </Html>
    </>
  )
}

export default Shape

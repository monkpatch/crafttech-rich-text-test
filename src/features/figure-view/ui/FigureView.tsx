import html2canvas from 'html2canvas'
import { ChangeEvent, memo, useEffect, useRef } from 'react'
import { Group, Image, Rect, Transformer } from 'react-konva'
import { Html } from 'react-konva-utils'
import { KonvaEventObject } from 'konva/lib/Node'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './figure-view.scss'
import Konva from 'konva'
import { Figure } from '../../../entities/figure'
import { RichTextTooltip } from './RichTextTooltip'

export type FigureViewProps = {
  figure: Figure
  isActive?: boolean
  onFocus?: (figure: Figure) => void
  onBlur?: (figure: Figure) => void
  onChange?: (figure: Figure) => void
}

export const FigureView = memo(
  ({ figure, isActive, onFocus, onBlur, onChange }: FigureViewProps) => {
    const editor = useEditor(
      { content: figure.html, extensions: [StarterKit] },
      [figure.html],
    )
    const editorRef = useRef<HTMLDivElement>(null)
    const groupRef = useRef<Konva.Group>(null)
    const imageRef = useRef<HTMLImageElement | null | undefined>()
    const trRef = useRef<Konva.Transformer>(null)
    const rectRef = useRef<Konva.Rect>(null)

    useEffect(() => {
      if (editor) {
        if (isActive) editor.commands.focus()
        else editor.commands.blur()
      }
    }, [isActive, editor])

    useEffect(() => {
      const layer = trRef.current?.getLayer()
      if (trRef.current && groupRef.current && layer) {
        const nodes = isActive ? [groupRef.current] : []
        trRef.current.nodes(nodes)
        layer.batchDraw()
      }
    }, [figure, isActive])

    if (
      figure.image &&
      (typeof imageRef.current === 'undefined' ||
        (imageRef.current && imageRef.current.src !== figure.image))
    ) {
      imageRef.current = document.createElement('img')
      imageRef.current.src = figure.image
    }

    useEffect(() => {
      if (isActive || !editorRef.current || imageRef.current !== null) return

      let cancel = false
      html2canvas(editorRef.current, {
        backgroundColor: 'transparent',
      }).then((canvas) => {
        if (cancel) return
        canvas.toBlob((blob) => {
          if (!blob || cancel) return
          imageRef.current = undefined
          onChange?.({ ...figure, image: URL.createObjectURL(blob) })
        })
      })
      return () => void (cancel = true)
    }, [isActive, figure, onChange, editorRef, imageRef])

    const handleClick = (e: KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true
      onFocus?.(figure)
    }

    const handleFocus = () => {
      onFocus?.(figure)
    }

    const handleBlur = () => {
      imageRef.current = null
      onBlur?.(figure)
    }

    const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
      onChange?.({
        ...figure,
        text: e.target.innerText,
        html: e.target.innerHTML,
      })
    }

    const handleDragEng = (e: KonvaEventObject<DragEvent>) => {
      onChange?.({
        ...figure,
        x: e.target.x(),
        y: e.target.y(),
      })
    }

    const handleTransform = async (e: KonvaEventObject<Event>) => {
      const scale = e.target.scale()
      e.target.scale({ x: 1, y: 1 })

      const position = e.target.position()
      e.target.position({ x: 0, y: 0 })

      onChange?.({
        ...figure,
        x: figure.x + position.x,
        y: figure.y + position.y,
        width: figure.width * scale.x,
        height: figure.height * scale.y,
      })
    }

    return (
      <Group x={figure.x} y={figure.y} draggable onDragEnd={handleDragEng}>
        <Group
          width={figure.width}
          height={figure.height}
          onClick={handleClick}
          ref={groupRef}
          onTransformEnd={handleTransform}
        >
          <Rect
            stroke={'black'}
            strokeWidth={2}
            width={figure.width}
            height={figure.height}
            ref={rectRef}
          />
          {!isActive && imageRef.current ? (
            <Image image={imageRef.current} x={4} y={3}></Image>
          ) : (
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
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Html>
          )}
        </Group>
        <Transformer ref={trRef} rotateEnabled={false} />
        {editor && isActive && <RichTextTooltip editor={editor} />}
      </Group>
    )
  },
)

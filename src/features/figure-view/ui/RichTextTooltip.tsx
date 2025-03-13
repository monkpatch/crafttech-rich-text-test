import { Editor } from '@tiptap/core'
import { Html } from 'react-konva-utils'
import './RichTextTooltip.scss'

export type RichTextTooltipProps = {
  editor: Editor
}

export const RichTextTooltip = ({ editor }: RichTextTooltipProps) => {
  return (
    <Html>
      <div className="rich-text-tooltip">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}
        >
          <i>I</i>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
        >
          <span style={{ fontSize: '1.1em' }}>H1</span>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
        >
          <span style={{ fontSize: '1.0em' }}>H2</span>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
        >
          <span style={{ fontSize: '0.9em' }}>H3</span>
        </button>
      </div>
    </Html>
  )
}

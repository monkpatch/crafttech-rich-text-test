import { forwardRef } from 'react'

const HtmlText = forwardRef(({ html, id }: any, ref: any) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: 'fixed',
        overflow: 'hidden',
        left: '100000px',
        top: '100000px',
      }}
      ref={ref}
    ></div>
  )
})

export default HtmlText

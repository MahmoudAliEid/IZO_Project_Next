import { useState, useEffect, Fragment } from 'react'

// ** Draft Js
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** Components
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = ({ editorValue, fieldName, setFieldValue }) => {
  // ** States for Editor
  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(editorValue))
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState)

  // ** Update field value when editorState changes
  useEffect(() => {
    if (editorState) {
      const rawContent = convertToRaw(editorState.getCurrentContent())
      const htmlContent = draftToHtml(rawContent)
      setFieldValue(`${fieldName}`, htmlContent)
    }
  }, [editorState, setFieldValue, fieldName])

  const rawContent = convertToRaw(editorState.getCurrentContent())
  const htmlContent = draftToHtml(rawContent)

  console.log('html content form editor:=>', htmlContent)

  // ** Render the editor
  return (
    <Fragment>
      <EditorWrapper>
        <ReactDraftWysiwyg
          editorState={editorState}
          onEditorStateChange={newEditorState => setEditorState(newEditorState)}
        />
      </EditorWrapper>
    </Fragment>
  )
}

export default Editor

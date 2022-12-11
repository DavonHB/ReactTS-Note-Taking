import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NewNote } from './NewNote'
import { useLocalStorage } from './useLocalStorage'

// Note data with an id attached
export type Note = {
  id: string
} & NoteData

// Data for our form
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

// Storing id of a specific tag, so when the value of a tag changes, only the tag is updated
export type RawNote = {
  id: string
}

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  // Storing state for tags
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  return (
    <Container className='my-4'>
    <Routes>
      <Route path='*'  element={<Navigate to='/' />} />
      <Route path='/' element={<div>Home</div>} />
      <Route path='/new' element={<NewNote />} />
      <Route  path='/:id'>
        <Route index element={<h1>Show</h1>} />
        <Route path='edit' element={<h1>Edit</h1>} />
      </Route>
    </Routes>
   </Container>
  )
}

export default App

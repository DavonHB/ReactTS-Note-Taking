import React, { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NewNote } from './NewNote'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from 'uuid'

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
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  // Storing state for tags
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  // Converting raw note into a note
  const notesWithTags = useMemo(() => {
    // Map through each note, and for each note we are going to return every note
    // Return tags for each note, and filter each tag that has the associated Id in the note thats being stored
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  // Handles note creation
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => { 
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  return (
    <Container className='my-4'>
    <Routes>
      <Route path='*'  element={<Navigate to='/' />} />
      <Route path='/' element={<div>Home</div>} />
      <Route path='/new' element={<NewNote onSubmit={onCreateNote} />} />
      <Route  path='/:id'>
        <Route index element={<h1>Show</h1>} />
        <Route path='edit' element={<h1>Edit</h1>} />
      </Route>
    </Routes>
   </Container>
  )
}

export default App

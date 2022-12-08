import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NewNote } from './NewNote'

function App() {

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

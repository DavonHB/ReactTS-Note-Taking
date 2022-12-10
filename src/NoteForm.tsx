import { Form, Stack, Row, Col, Button, } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import { Link } from'react-router-dom'
import { useRef, useState, FormEvent } from 'react'
import { NoteData, Tag } from './App'

// When we submit, it is going to give the NoteData type, and return a void value
type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export function NoteForm({ onSubmit }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    // Store tags 
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({ 
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} required />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        {/* Mapping selected tags to a brand new value, CreatableReactSelect expects a label and id */}
                        <CreatableReactSelect value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id}
                        })}
                        // Converting from a label and a value to a label and an id
                        // This is the type we are storing, not the type CreatableReactSelect expects
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return { label: tag.label, id: tag.value }
                            }))
                        }} isMulti />
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={markdownRef} required as='textarea' rows={15} />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end' >
                    <Button type='submit'variant='primary' >Save</Button>
                    <Link to='..'>
                    <Button type='button' variant='outline-secondary' >Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
        </>
    )
}
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const AddBook = () => {
    const [isAdmin, setIsAdmin] = useState()

    useEffect(() => {
        setIsAdmin(localStorage.getItem('isAdmin'))
    }, [])

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        genre: '',
        description: '',
        coverImage: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/books', { data: formData })
            if (response.data.message === 'New Book created successfully') {
                console.log(response.data);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className='mt-5'>Add New Book</h1>
                <div className="row mt-5">
                    <form method="POST" onSubmit={handleForm}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputTitle1" className="form-label">Book Title</label>
                            <input type="text" className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" onChange={handleChange} name="title" value={formData.title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAuthor1" className="form-label">Author</label>
                            <input type="text" className="form-control" id="exampleInputAuthor1" aria-describedby="emailHelp" onChange={handleChange} name="author" value={formData.author} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPrice1" className="form-label">Price</label>
                            <input type="number" className="form-control" id="exampleInputPrice1" aria-describedby="emailHelp" onChange={handleChange} name="price" value={formData.price} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputGenre1" className="form-label">Genre</label>
                            <input type="text" className="form-control" id="exampleInputGenre1" aria-describedby="emailHelp" onChange={handleChange} name="genre" value={formData.genre} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputDesc1" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="exampleInputDesc1" aria-describedby="emailHelp" onChange={handleChange} name="description" value={formData.description} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputImage1" className="form-label">Cover Image</label>
                            <input type="text" className="form-control" id="exampleInputImage1" aria-describedby="emailHelp" onChange={handleChange} name="coverImage" value={formData.coverImage} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add New Book</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default AddBook
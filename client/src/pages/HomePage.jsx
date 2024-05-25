import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import axios from 'axios'
import BookCard from '../components/BookCard/BookCard'

const HomePage = () => {
    const [bookList, setBookList] = useState([])
    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/books')
            console.log(response.data.books);
            setBookList(response.data.books)
        } catch (error) {
            console.error('Error fetaching books', error);
        }
    }
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="books mt-5 d-flex justify-content-around flex-wrap">
                        {bookList.length > 0 && bookList.map((book) => <BookCard book={book} key={book.title} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
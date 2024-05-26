import React, { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { data: formData })
            if (response.data.message === 'Logged In successfully') {
                console.log(response.data);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('isAdmin', response.data.data.isAdmin);
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className='mt-5'>Login </h1>
                <div className="row mt-5">
                    <form method="POST" onSubmit={handleForm}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} name="email" value={formData.email} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name="password" value={formData.password} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login
import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login, reset } from "../features/auth/authSlice";

import './Login.css'

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate()

const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

useEffect(() => {
  if (isError) {
    toast.error(message)
  }

  if (isSuccess || user) {
    navigate('/')
  }

  dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])


  const onSubmit = (e) => {
    e.preventDefault();

    console.log(username)
    console.log(email)
    console.log(password)

    const userData = {username, email, password}

    dispatch(login(userData))

  } 

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Welcome To TaskTracker</p>
      </section>
      <section className="form">
      <form
      onSubmit={onSubmit}
      >
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
      </section>
     
    </>
  );
};

export default Login;

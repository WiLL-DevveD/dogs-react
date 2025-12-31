import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPwdLost from './LoginPwdLost'
import LoginPwdReset from './LoginPwdReset'

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm/>} />
        <Route path='criar' element={<LoginCreate/>} />
        <Route path='perdeu' element={<LoginPwdLost/>} />
        <Route path='resetar' element={<LoginPwdReset/>} />
      </Routes>
      </div>
  )
}

export default Login
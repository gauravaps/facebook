import React, { useState } from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import './style.css'
import { Link } from 'react-router-dom'
import LoginInput from '../../components/inputs/loginInput/LoginInput'

const loginInfo={
  email:'',
  password:'',
}

const Login = () => {
  const [login ,setLogin] =useState(loginInfo)
  const {email ,password}=login
  console.log(login);

  const loginHandelChange= (e) =>{
    e.preventDefault()
    const {name ,value} =e.target
    setLogin({...login , [name]:value})
  }

  const loginSchema =Yup.object({
    email:Yup.string().required('Email address is required')
    .email('must be a valid email')
    .min(5),
    password:Yup.string().required('password is required').min(6)
  })

  return (
    <div className='login'>
      <div className="login_wrapper">
          <div className="login_wrap">

            <div className="login_1">
              <img src="../../icons/facebook.svg" alt="" />
              <span>Facebook help you connect and share with the people in your life.</span>
            </div>

            <div className="login_2">
              <div className="login_2_wrap">
                <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }
                }
                validationSchema={loginSchema} 
                >
                  {(formik)=>(
                  <Form>
                    <LoginInput 
                    type="email"
                    name="email"
                    onChange={loginHandelChange}
                    placeholder='Enter your email or phone'/>

                    <LoginInput 
                    type="password"
                    name="password"
                    onChange={loginHandelChange}
                    placeholder='Password'/>
                    

                    <button type='submit' className="blue_btn">Log In</button>
                  </Form>
                  )}
                </Formik>

                <Link to={'/forget'} className='forget_password'>Forgotten password ?</Link>

                <div className="sign_splitter"></div>

                  <button className='blue_btn open_signup'>Create Account</button>
                  </div>
                  
                <Link to={'/'} className="sign_extra"> 
                <b>Create a page</b> 
                for a celebrity , brand or business.
                </Link>

              
            </div>
          </div>

          <div className="register"></div>


      </div>  

    </div>
  )
}

export default Login
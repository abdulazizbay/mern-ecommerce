import { useState } from "react";
import { useHttp } from "../../hooks/authHook";
import fc from "../../assets/facebook.png"
import gog from "../../assets/google.svg"
import inst from "../../assets/instagram.png"
import twch from "../../assets/twitch.png"
import bgRegister from "../../assets/bgRegister.png"
import styled from "styled-components";
import {useFormik, Field,FormikProvider} from "formik";
import * as Yup from 'yup';
import "./form.css"
import {useAuth} from "../../hooks/inUpHook";
import {CustomToast} from "../custom-toast/CustomToast";
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const auth = useAuth()
    const {ErrorToast,LoadingToast,SuccessToast} = CustomToast()
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(2,"Too short").max(50, 'Too Long!'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    const socialMediaImages = [fc, gog, inst, twch];
    const { request, wait, error } = useHttp();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const data = await request('/api/auth/register', 'POST', { ...values },{
                    Authorization: `Bearer ${auth.token}`
                });
                setSubmitting(false);
                SuccessToast("User created successfully")
                navigate("/auth/login")
            } catch (e) {
                ErrorToast(e.message)
                throw e.message;
            }
        },
    });

    return (
        <StyledRegister>
            <section className="register-container">
                <main className="main-content">
                    <div className="text-container">
                        <div className="logo">
                            <h1>Kradus</h1>
                        </div>
                        <div className="account-social">
                            <div className="account-text">
                                <h1>Don’t have an account?</h1>
                                <p>Register to access all the features of our service.</p>
                                <p> Manage your business in one place. It’s free!</p>
                            </div>
                            <div className="social-media">
                                {socialMediaImages.map((item, index) => {
                                    return <img src={item} alt={item} key={index}/>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-container">

                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="sign-up"><h1>Sign Up</h1></div>
                                <div className="form">
                                    {/*<label htmlFor="email" className="floating-label">E-mail</label>*/}
                                    <Field
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="inputarea"
                                    />
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email}
                                    </div>

                                    {/*<label htmlFor="name" className="floating-label">Name</label>*/}
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        className="inputarea"
                                    />
                                    <div className="error">
                                        {formik.touched.name && formik.errors.name}
                                    </div>

                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="inputarea"
                                    />
                                    <div className="error">
                                        {formik.touched.password && formik.errors.password}
                                    </div>

                                    <button type="submit" disabled={formik.isSubmitting || wait}>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </FormikProvider>

                    </div>
                </main>
            </section>
        </StyledRegister>
    );
};

const StyledRegister = styled.div`
    section{
      font-family: "Inria Sans",sans-serif !important;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center; 
      align-items: center;
      main{
        //width: 100%;
        width: 1281px;
        height: 724px;
        margin: 0 auto;
        background-image: url(${bgRegister});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #fff;

        .text-container{
          padding: 155px 0 30px 105px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .logo{
            text-transform: uppercase;
            font-weight: 400;
            font-size: 24px;
          }
          .account-social{
            .account-text{
              padding-bottom: 49px;
              font-weight: 400;
              h1{
                font-size: 45px;
                max-width: 263px;
                padding-bottom: 25px;
              }
              p{
                font-size: 24px;
                line-height: 32px;
              }
            }
            .social-media{
              display: flex;
              gap: 15px;
            }
          }
          
        }
        .form-container{
          width: 470px;
          backdrop-filter: blur(6px); 
          background-color: rgba(0, 0, 0, 0.1); 
          form{
            padding: 120px 0 0 50px;
            .sign-up{
              font-size: 24px;
              font-weight: 400;
              padding-bottom: 90px;
            }
            .form{
              gap: 10px;
              float: left;
              
              input{
                outline: none;
                border: none;
                background-color: transparent;
                border-bottom: 0.4px solid #ffffff;
                height: 30px;
                color: #ffffff;
              }
              ::placeholder{
                color: #ffffff;
                opacity: 0.5;
                font-size: 15px;
                font-weight: 400;
              }
              label{
                position: absolute;
                top: 10px;
                left: 10px;
                transition: top 0.2s, font-size 0.2s;
              }
              button{
                margin-top: 130px;
              }
            }
          }

        }
      }
    }
  
`




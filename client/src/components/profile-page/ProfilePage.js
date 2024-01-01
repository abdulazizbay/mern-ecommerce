import styled from "styled-components";
import forestIMG from "../../assets/forestbg.png"
import profPic1 from "../../assets/profilepic1.png"
import {CustomButton} from "../buttons/Button";
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/authHook";
import { useAuth } from "../../hooks/inUpHook";
import masterImg from "../../assets/mastercard.png"
import visaImg from "../../assets/visapay.png"
import unionImg from "../../assets/unionpay.png"
import {CustomToast} from "../custom-toast/CustomToast";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Field, FormikProvider, useFormik} from "formik";

const validationSchema = Yup.object({
    cardNum: Yup.string()
        .required('Card Number is required')
        .min(15, "Too short (min: 15)")
        .max(20, 'Too Long!'),

    cardLast: Yup.string()
        .required('Card Number is required')
        .matches(/^\d{4}$/, 'Card Number must be exactly 4 digits'),
});

export const ProfilePage = ()=>{
    const [budgetAmount, setButdgetAmount] = useState(0)
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [openedMenu,setOpenedMenu] = useState(false)
    const [chosenCardType,setChosenCardType] = useState()
    const {request,wait,error} = useHttp()
    const auth = useAuth();
    const {SuccessToast,ErrorToast} = CustomToast()
    const navigate = useNavigate()


    const [menuProps,setMenuProps] = useState([

    ])

    const formik = useFormik({
        initialValues: {
            cardNum: '',
            cardLast: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const determineCardType = (cardNumber) => {
                if (cardNumber.startsWith("2") || cardNumber.startsWith("5")) {
                    return masterImg;
                } else if (cardNumber.startsWith("4")) {
                    return visaImg;
                } else {
                    return unionImg;
                }
            };

            const cardType = determineCardType(values.cardNum);

            setMenuProps(prevState => [
                ...prevState,
                { img: cardType, number: values.cardNum, cvv: values.cardLast }
            ]);

            resetForm();
            setOpenedMenu(false)
        }

    });
    useEffect(() => {
        console.log(chosenCardType);
    }, [chosenCardType]);

    const fetchGetProfile = async (req,res)=>{
        try {
            const data = await request("api/auth/getprofile", "GET",null,{
                Authorization: `Bearer ${auth.token}`,
            } )
            setUserEmail(data.email)
            setUserName(data.name)

            console.log(data,"Sas")
        }catch (err) {
            ErrorToast("Login First")
            console.log(err.message)
            if(err.message==="Not authorized2."){
                navigate("/auth/login")
            }
        }
    }
    useEffect(() => {
        if (auth.token) {
            fetchGetProfile();
        }
    }, [auth.token]);

    return(
        <StyledProfilePage forestImg={forestIMG}>
            <section className="profile-container">
                <main>
                    <div className="cards-container">
                        <div className="intro-container">
                            <h1>Cards</h1>
                            <p>Lorem ipsum dolor sit amet consectetur. Habitant duisviverra volutpat quisque eget.</p>
                        </div>
                        <div className="payment-details">
                            <h2>Payment details</h2>
                            <div className="payment-group">
                                {menuProps.map(item => (
                                    <div className="payment-item" key={item.number}>
                                        <div className="main-content">
                                            <img src={item.img} alt="Card" />
                                            <div className="data">
                                                <h3>Credit Card</h3>
                                                <p>{item.number}</p>
                                            </div>
                                        </div>
                                        <div>{item.cvv}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="new-card">
                                {!openedMenu?
                                    <div
                                        className="gray-box"
                                        onClick={()=>{setOpenedMenu(true)}}
                                    >
                                        +
                                    </div>
                                    :
                                    <div className="opened-group">
                                        <FormikProvider value={formik}>
                                            <form onSubmit={formik.handleSubmit}>
                                                    <label htmlFor="cardNum" ><p>Номер карты</p></label>
                                                    <Field
                                                        type="string"
                                                        name="cardNum"
                                                        className="inputarea"
                                                    />
                                                    <div className="error">
                                                        {formik.touched.cardNum && formik.errors.cardNum}
                                                    </div>
                                                    <label htmlFor="cardLast" ><p>Срок действия карты</p></label>
                                                    <Field
                                                        type="string"
                                                        name="cardLast"
                                                        className="inputarea"

                                                    />
                                                    <div className="error">
                                                        {formik.touched.cardLast && formik.errors.cardLast}
                                                    </div>
                                                    <div className="button-item">
                                                        <CustomButton fontcolor="#23272F" children="Submit" bgcolor="#D9D9D9" />
                                                    </div>

                                            </form>
                                        </FormikProvider>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="main-content">
                            <div className="image-cont">
                                <img src={profPic1}/>
                            </div>
                            <div className="info-group">
                                <h3>{userName}</h3>
                                <p>{userEmail}</p>
                                <CustomButton bgcolor="#2B63FF" fontcolor="#fff" children="Premium"/>
                            </div>
                        </div>
                        <div className="budget">
                            <div className="buttons">
                                <div className="new-container">
                                    <h2>New</h2>
                                </div>
                                <div className="plan-container">
                                    <h2>Installment Plan</h2>
                                </div>
                            </div>
                            <div className="budget-amount">
                                <h2>{"100$-1000$"}</h2>
                                <input
                                    type="range"
                                    id="points"
                                    name="points"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={budgetAmount}
                                    onChange={event =>setButdgetAmount(event.target.value)}
                                />
                                <h2>{budgetAmount}$</h2>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.div`

    section{
      background-color: #1B1E23;
      main{
        display: flex;
        justify-content: space-between;
        gap: 100px;
        padding: 100px 47px 74px 50px;
        font-weight: 400;
        font-family: 'Inter', Arial, sans-serif;
        color: white;
        .cards-container{
          background-color: #23272F;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          border-radius: 15px;
          padding: 40px 10px 47px 40px;
          .intro-container{
            h1{
              font-size: 64px;
            }
            p{
              font-size: 32px;
              padding: 50px 0 ;
            }
          }
          .payment-details{
            h2{
              font-size: 48px;
            }
            p{
              font-size: 24px;
              color: white;
            }
            h3{
              font-size: 39px;
            }
            .payment-group{
              padding-top: 50px;
              display: flex;
              flex-direction: column;
              gap: 50px;
              .payment-item{
                max-width: 600px;
                display: flex;
                justify-content: space-between;
                .main-content{
                  display: flex;
                  gap: 10px;
                  .data{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                  }
                }
                .div{
                  
                }
              }
            }
            .new-card{
              max-width: 600px;
              display: flex;
              justify-content: space-between;
              .gray-box{
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #494545;
                width: 150px;
                height: 80px;
                font-size: 40px;
                color: #646464;
              }
              .opened-group{  
                form{
                  input{
                    margin: 20px 0 0 0;
                    border: 1.5px solid #fff ;
                    border-radius: 15px ;
                    padding: 25px;
                    color: white;
                    outline: none;
                  }
                  p{
                    margin-top: 40px;
                  }
                  .error{
                    color: #FF0000;
                  }
                  .button-item{
                    float: right;
                    margin-top: 23px ;
                    button{
                      width: 120px;
                      height: 30px;
                      font-size: 20px;
                    }

                  }
                  
                }
              }
              .div{

              }
            }
            
          }
        }
        .info-container{
          display: flex;
          flex-direction: column;
          gap: 50px;
          
          .main-content{
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border-radius: 15px;
            background-color: #23272F;
            .image-cont {
              background-image: url(${(props) => props.forestImg});
              background-size: cover;
              width: 540px;
              height: 140px;
              border-radius: 15px;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                position: absolute;
                top: 30px;
              }
            }
            .info-group{
              padding: 50px 0 62px 0;
              display: flex;
              flex-direction:  column;
              gap: 25px;
              align-items: center;
              h3{
                font-size: 32px;
              }
              p{
                font-size:20px;
                color: #6C6C6C;
              }
              button{
                width: 150px;
                height: 35px;
                font-size: 20px;
              }
            }
          }
          .budget{
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border-radius: 15px;
            background-color: #23272F;            
            padding: 70px 0 25px 50px;
            h2{
              font-size:36px;
            }
            .buttons{
              display: flex;
              gap: 30px;
              .new-container, .plan-container{
                width: 220px;
                height: 110px;
                border-radius: 15px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;    
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 11px;
              }
            }
            .budget-amount {
               padding-top: 52px;
               display: flex;
               flex-direction: column;
               align-items: center;
              input[type="range"] {
                width: 372px;
                background: black;
                margin: 10px 0;
              }

             }

          }
        }
      }
    }
`
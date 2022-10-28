/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import './login.css'
import toast, { Toaster } from 'react-hot-toast'
import { ForgetPassword, LoginApi, OTPverify, ResetPassoword } from 'src/api/api'
const Login = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [visibleReset, setVisibleReset] = useState(false)
  const [otp, setOtp] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rPass1, setRpass1] = useState('')
  const [rPass2, setRpass2] = useState('')
  const [femail, setfemail] = useState("")
  const [genToken, setGenToken] = useState("")
  const [otps, setOtps] = useState("")

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/dashboard')
    }
  })


  const loginAction = () => {
    if (!validator.isEmail(userName)) {
      toast.error('Enter valid email !')
    }
    else if (password.length < 9 || password == null || password === "") {
      toast.error('Enter valid password !')
    } else {
      LoginApi({ email: userName, password: password }).then((r) => {
        if (r.data.data != null && (r.data.token !== null || r.data.token !== "")) {
          toast.success("Login successfully !")
          localStorage.setItem('token', r.data.token)
          navigate('/Dashboard')
        }
      }).catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message)
        }
      })
    }
  }

  const fsubmitHandler = () => {
    if (!validator.isEmail(femail)) {
      toast.error('Enter valid email !')
    } else {
      ForgetPassword({ email: femail }).then((r) => {
        if (r.data.data != null && (r.data.token !== null || r.data.token !== "")) {
          setOtp(true)
          setGenToken(r.data.token)
          toast.success("OTP send successfully , Check your email !")
        }
      }).catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message)
        }
      })
    }
  }

  const verify = () => {
    OTPverify({ otp: otps }, genToken).then((r) => {
      if (r.data.data != null) {
        setOtps("")
        setOtp(false)
        setVisible(false)
        setVisibleReset(true)
        toast.success("Otp verified successfully !")
      }
    }).catch((e) => {
      if (e.response) {
        toast.error(e.response.data.message)
      }
    })
  }

  const finalResetPassword = () => {
    ResetPassoword({
      newPassword: rPass1,
      confirmPassword: rPass2
    }, genToken).then((r) => {
      if (r.data.data != null) {
        setRpass1("")
        setRpass2("")
        setGenToken("")
        setVisibleReset(false)
        toast.success("Password Reset Successfully !")
      }
    }).catch((e) => {
      if (e.response) {
        toast.error(e.response.data.message)
      }
    })
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CModal alignment="center" visible={visibleReset} onClose={() => setVisible(false)} size='sm'>

          <CModalHeader >
            <CModalTitle>Reset Password</CModalTitle>
          </CModalHeader>

          <CModalBody className='p-4'>
            <CRow>
              <CCol md={12} >
                <CFormInput
                  value={rPass1}
                  onChange={(e) => setRpass1(e.target.value)}
                  type="password"
                  placeholder="password"
                  className='inputborder'
                />
              </CCol>
              <CCol md={12} className="mt-2">
                <CFormInput
                  value={rPass2}
                  onChange={(e) => setRpass2(e.target.value)}
                  type="password"
                  placeholder="Re-password"
                  className='inputborder'
                />
              </CCol>
              <CCol md={12} className="mt-2">
                <CButton color="primary" className='loginbtn' onClick={finalResetPassword}>Reset Password</CButton>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>

        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} size='sm'>

          <CModalHeader >
            <CModalTitle>Forget Password</CModalTitle>
          </CModalHeader>

          <CModalBody className='p-4'>
            <CRow>
              {
                !otp ?
                  <>
                    <CCol md={8} >
                      <CFormInput
                        value={femail}
                        onChange={(e) => setfemail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className='inputborder'
                      />
                    </CCol>

                    <CCol md={4} >
                      <CButton color="primary" className='loginbtn' onClick={fsubmitHandler}>Submit</CButton>
                    </CCol>
                  </>
                  :
                  <>
                    <CCol xl={6}>
                      <CFormInput
                        value={otps}
                        onChange={(e) => setOtps(e.target.value)}
                        type="text"
                        placeholder="OTP"
                        maxLength={4}
                        className='inputborder'
                      />
                    </CCol>
                    <CCol md={6} >
                      <CButton color="primary" className='loginbtn' onClick={verify}>Verify</CButton>
                    </CCol>

                  </>
              }
            </CRow>
          </CModalBody>
        </CModal>

        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5} >
              <CCardGroup className=''>
                <CCard className="p-4 cardstyle">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          type="email"
                          placeholder="Email"
                          className='inputborder'
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          className='inputborder'
                        />
                      </CInputGroup>
                      <CRow className='mt-4'>
                        <CCol xs={12} xl={5} md={5} lg={5}>
                          <CButton color="primary" className="px-4 loginbtn" onClick={loginAction} type='button'>
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={12} xl={7} md={7} lg={7} className="text-end">
                          <CButton color="link" className="px-0 linkbtn" onClick={() => setVisible(true)}>
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login

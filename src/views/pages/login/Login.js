/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/dashboard')
    }
  })
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const loginAction = () => {
    if (!(userName === 'admin' && password === 'admin')) {
      setToastView(true)
    } else {
      localStorage.setItem('token', '123')
      setToastView(false)
      navigate('/Dashboard')
    }
  }
  const [visible, setVisible] = useState(false)
  const [toastview, setToastView] = useState(false)

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Forget Password</CModalTitle>
          </CModalHeader>
          <CModalBody className='p-4'>
            <CRow>
              <CCol md={9} >
                <CFormInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className='inputborder'
                />
              </CCol>
              <CCol md={3} >
                <CButton color="primary" className='loginbtn'>Submit</CButton>
              </CCol>
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
                      {/* {
                        toastview &&
                        <b style={{ color: 'red' }}>username or password wrong !</b>
                      } */}
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login

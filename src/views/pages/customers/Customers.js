/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import CIcon from '@coreui/icons-react'

import { CButton, CCol, CFormInput, CInputGroup, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

import {
    cilTrash,
    cilContact
} from '@coreui/icons'

import { useEffect, useState } from 'react'
import { getAllCustomer } from 'src/api/api'
import AlertBox from './AlertBox'
import ViewModel from './ViewModel'

export default function Customers() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)
    const getMyCustomer = () => {
        setLoader(true)
        getAllCustomer()
            .then((r) => {
                setLoader(false)
                setTableData(r.data.data)
            }).catch((e) => {
                setLoader(false)
                console.log(e)
            })
    }

    useEffect(() => {
        getMyCustomer()
    }, [])

    const [visible, setVisible] = useState(false)
    const [visibleView, setVisibleView] = useState(false)
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [currentReview, setCurrentReview] = useState(null)
    const [viewVisible, setViewVisible] = useState(false)
    const [updatingReview, setUpdatingReview] = useState("")
    return (
        <>
            <AlertBox visible={visible} onClose={() => setVisible(false)} onNo={() => setVisible(false)} onYes={() => null} />
            <ViewModel
                size={2}
                onClose={() => {
                    setUpdatingReview("")
                    setCurrentReview(null)
                    setVisibleView(false)
                }}
                visibleView={visibleView}
                title={"Customer Details"}
                body={
                    <>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Review</CTableHeaderCell>
                                    <CTableHeaderCell>Ratings</CTableHeaderCell>
                                    <CTableHeaderCell>Overall Ratings</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div>{currentCustomer.name}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{currentCustomer?.reviews?.map((v, i) =>
                                            <CRow key={i}>
                                                <CCol xl={8}>
                                                    <div key={i}>{v}</div>
                                                </CCol>
                                                <CCol xl={4}>
                                                    <div onClick={() => {
                                                        setUpdatingReview(v)
                                                        setCurrentReview({ userid: v, review: v })
                                                        setViewVisible(true)
                                                    }} className='viewbtn'>
                                                        view
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        )}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <div>{currentCustomer.starsRating}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <div>{currentCustomer.overallRating}</div>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                        {
                            currentReview != null ?
                                <CRow className='mt-5'>
                                    <CCol xs={12} md={12} lg={12} xl={12}>
                                        <textarea rows={5} value={updatingReview} onChange={(e) => setUpdatingReview(e.target.value)} style={{ width: "100%" }}>
                                        </textarea>
                                    </CCol>
                                    <CCol xs={12} md={12} lg={12} xl={12}>
                                        <CButton color="danger" variant="ghost">
                                            Delete Review
                                        </CButton>
                                        <CButton color="info" variant="ghost" onClick={() => alert(updatingReview)}>
                                            Update Review
                                        </CButton>
                                        <CButton color="primary" variant="ghost" onClick={() => setCurrentReview(null)}>
                                            Close Review
                                        </CButton>
                                    </CCol>
                                </CRow> : null
                        }
                    </>
                }
                footer={
                    <CButton color="danger" onClick={() => setVisibleView(false)}>
                        close
                    </CButton>
                }
            />
            <CInputGroup className="mb-3">
                <CFormInput placeholder="Search by Name or Email id or Phone number" aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" />
            </CInputGroup>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell>Id</CTableHeaderCell>
                        <CTableHeaderCell>Customer Name</CTableHeaderCell>
                        <CTableHeaderCell>Email id</CTableHeaderCell>
                        <CTableHeaderCell>Phone number</CTableHeaderCell>
                        <CTableHeaderCell>Added By(service provider)</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        loader ?
                            <CTableRow>
                                <CTableDataCell colSpan={6} className="text-center">
                                    <CSpinner />
                                </CTableDataCell>
                            </CTableRow>
                            :
                            tableData.length > 0 ?
                                tableData?.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell>
                                            <div>{index + 1}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.email}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.contact}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{"added by"}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color="info" variant="ghost" onClick={() => {
                                                setCurrentCustomer(item)
                                                setVisibleView(true)
                                            }}>
                                                <CIcon icon={cilContact} />
                                            </CButton>
                                            <CButton color="danger" variant="ghost" onClick={() => setVisible(true)}>
                                                <CIcon icon={cilTrash} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                                : <CTableRow>
                                    <CTableDataCell colSpan={6} className="text-center">
                                        <h3>No data</h3>
                                    </CTableDataCell>
                                </CTableRow>
                    }
                </CTableBody>
            </CTable>
        </>
    )
}

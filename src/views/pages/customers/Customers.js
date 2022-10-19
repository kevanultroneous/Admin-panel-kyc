/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import CIcon from '@coreui/icons-react'

import { CButton, CCol, CFormInput, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

import {
    cilTrash,
    cilContact,
    cilSearch
} from '@coreui/icons'

import { useEffect, useState } from 'react'
import { getAllCustomer } from 'src/api/api'
import AlertBox from './AlertBox'
import ViewModel from './ViewModel'
import { customerField, viewCustomerField } from './dummyList'
import { NoData, SpinnerView } from './Nodata'
import { Toaster } from 'react-hot-toast'

export default function Customers() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleView, setVisibleView] = useState(false)
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [currentReview, setCurrentReview] = useState(null)
    const [viewVisible, setViewVisible] = useState(false)
    const [updatingReview, setUpdatingReview] = useState("")

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

    const customerDetailHide = () => {
        setViewVisible(false)
        setUpdatingReview("")
        setCurrentReview(null)
        setVisibleView(false)
    }

    return (
        <div>
            {/* Alert box and View data model */}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <AlertBox visible={visible} onClose={() => setVisible(false)} onNo={() => setVisible(false)} onYes={() => null} />
            <ViewModel
                size={2}
                onClose={() => customerDetailHide()}
                visibleView={visibleView}
                title={"Customer Details"}
                body={
                    <div>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    {viewCustomerField.map((v, i) => <CTableHeaderCell key={i}>{v}</CTableHeaderCell>)}
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
                            currentReview != null && viewVisible === true ?
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
                    </div>
                }
                footer={
                    <CButton color="danger" onClick={() => setVisibleView(false)}>
                        close
                    </CButton>
                }
            />

            {/* Search bar */}
            <CInputGroup className="mb-3">
                <CFormInput placeholder="Search by Name or Email id or Phone number" aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" />
                <CButton type="button" color="info" variant="outline" id="button-addon2">
                    <CIcon icon={cilSearch} />
                </CButton>
            </CInputGroup>

            {/* Data table */}
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        {customerField.map((v, i) => <CTableHeaderCell key={i}>{v}</CTableHeaderCell>)}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        loader ? <SpinnerView /> :
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
                                : <NoData />
                    }
                </CTableBody>
            </CTable>
        </div>
    )
}

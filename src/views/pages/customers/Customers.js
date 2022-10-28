/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import CIcon from '@coreui/icons-react'

import { CButton, CCol, CFormInput, CFormSwitch, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

import {
    cilTrash,
    cilContact,
    cilList
} from '@coreui/icons'

import { useEffect, useState } from 'react'
import { customerSearch, getAllCustomer, setBlockOrUnblockUser } from 'src/api/api'
import AlertBox from './AlertBox'
import ViewModel from './ViewModel'
import { customerField, viewCustomerField } from './dummyList'
import { NoData, SpinnerView } from './Nodata'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Customers() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visibleView, setVisibleView] = useState(false)
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [currentReview, setCurrentReview] = useState(null)
    const [viewVisible, setViewVisible] = useState(false)
    const [updatingReview, setUpdatingReview] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [titleOfModel, setTitleOfModel] = useState("Block")

    useEffect(() => {
        getMyCustomer()
    }, [])

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

    const callSearch = (input) => {
        setLoader(true)
        setTimeout(() => {
            customerSearch({ searchText: input }).then((r) => {
                setLoader(false)
                setTableData(r.data.data)
            }).catch((e) => {
                setLoader(false)
                if (e.response) {
                    toast.error(e.response.data.message)
                }
            })
        }, 1000)
    }

    const customerDetailHide = () => {
        setViewVisible(false)
        setUpdatingReview("")
        setCurrentReview(null)
        setVisibleView(false)
    }

    const handleBlockUnblock = (e) => {
        setVisible2(true)
        if (e.target.checked) {
            setTitleOfModel("Block")
        } else {
            setTitleOfModel("Unblock")
        }
    }

    const callBlockAction = (id) => {
        setBlockOrUnblockUser(id).then((r) => {
            getMyCustomer()
            setVisible2(false)
        }).catch((e) => {
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }

    return (
        <div>
            {/* Alert box and View data model */}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <AlertBox
                customTitle={titleOfModel + " Service Provider"}
                customBody={
                    <>
                        <h6>Are you sure to <b>{titleOfModel} {currentUser?.name}</b>  Customer ?</h6>
                        {
                            titleOfModel === "Block" &&
                            <h6>This person will no longer be able to interact with you in KYC.</h6>
                        }
                    </>
                } visible={visible2}
                onClose={() => setVisible2(false)}
                onNo={() => setVisible2(false)}
                onYes={() => callBlockAction({ userId: currentUser._id })} />
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
                                    {/* <CTableDataCell>
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
                                    </CTableDataCell> */}
                                    <CTableDataCell >
                                        <div>{currentCustomer.totalReviews}</div>
                                    </CTableDataCell>
                                    <CTableDataCell >
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
                                        {/* <CButton color="info" variant="ghost" onClick={() => alert(updatingReview)}>
                                            Update Review
                                        </CButton> */}
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
                <CFormInput placeholder="Search by Name or Email id or Phone number"
                    aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" onChange={(e) => callSearch(e.target.value)} />
                {/* <CButton type="button" color="info" variant="outline" id="button-addon2">
                    <CIcon icon={cilSearch} />
                </CButton> */}
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
                                        {console.log(item)}
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
                                            <Link to={{ pathname: "/view-customer" }} state={{ item: item._id }}>View in Details
                                            </Link>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CFormSwitch id={`switchblock${index}`} type='checkbox'
                                                checked={item.isActive}
                                                onChange={(e) => {
                                                    setCurrentUser(item)
                                                    handleBlockUnblock(e)
                                                }}
                                            />
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

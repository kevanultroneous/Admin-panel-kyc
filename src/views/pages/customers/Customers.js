/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import {
    cilTrash,
    cilContact
} from '@coreui/icons'
// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/user.png'
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

    return (
        <>
            <AlertBox visible={visible} onClose={() => setVisible(false)} onNo={() => setVisible(false)} onYes={() => null} />
            <ViewModel
                size={2}
                onClose={() => setVisibleView(false)}
                visibleView={visibleView}
                title={"Customer Details"}
                body={
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
                                                <div onClick={() => setVisible(true)} className='viewbtn'>
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
                                            <div>{item.email}</div>
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

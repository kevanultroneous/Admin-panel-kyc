/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import CIcon from '@coreui/icons-react'
import { CButton, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
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
export default function Customers() {
    const [tableData, setTableData] = useState([])
    const getMyCustomer = () => getAllCustomer().then((r) => setTableData(r.data.data)).catch((e) => console.log(e))
    useEffect(() => {
        getMyCustomer()
    }, [])
    const [visible, setVisible] = useState(false)
    const [visibleView, setVisibleView] = useState(false)

    return (
        <>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Remove User</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure to remove this Customer Profile ?
                    <div>
                        <small><b>This will remove this customer profile, ratings and reviews</b></small>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        No
                    </CButton>
                    <CButton color="primary">Yes</CButton>
                </CModalFooter>
            </CModal>
            <CModal alignment="center" visible={visibleView} onClose={() => setVisibleView(false)}>
                <CModalHeader>
                    <CModalTitle>User Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CButton color="info" variant="ghost" onClick={() => setVisibleView(true)}>
                            Edit Review
                        </CButton>
                        <CButton color="danger" variant="ghost" onClick={() => setVisible(true)}>
                            Delete Review
                        </CButton>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleView(false)}>
                        close
                    </CButton>
                </CModalFooter>
            </CModal>
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
                    {tableData?.map((item, index) => (
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
                                <CButton color="info" variant="ghost" onClick={() => setVisibleView(true)}>
                                    <CIcon icon={cilContact} />
                                </CButton>
                                <CButton color="danger" variant="ghost" onClick={() => setVisible(true)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
}

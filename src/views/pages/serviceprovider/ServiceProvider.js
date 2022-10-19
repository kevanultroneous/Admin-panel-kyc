/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { CButton, CFormInput, CFormSwitch, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import { getAllServiceProvider } from 'src/api/api'
export default function ServiceProvider() {
    const [tableData, setTableData] = useState([])
    const getMySP = () => getAllServiceProvider().then((r) => setTableData(r.data.data)).catch((e) => console.log(e))
    useEffect(() => {
        getMySP()
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
                    Are you sure to remove this user ?
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
                    User detail
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleView(false)}>
                        close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CInputGroup className="mb-3">
                <CFormInput placeholder="Search by Name or Email id or Phone number" aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" />
                {/* <CButton type="button" color="info" variant="outline" id="button-addon2">
                    <CIcon icon={cilSearch} />
                </CButton> */}
            </CInputGroup>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell>Id</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Email id</CTableHeaderCell>
                        <CTableHeaderCell>Phone number</CTableHeaderCell>
                        <CTableHeaderCell>Action (Block)</CTableHeaderCell>
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
                                <CFormSwitch id={`switchblock${index}`} type='checkbox' />
                            </CTableDataCell>

                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
}

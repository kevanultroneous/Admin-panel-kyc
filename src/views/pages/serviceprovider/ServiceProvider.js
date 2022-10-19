/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CFormInput, CFormSwitch, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import { getAllServiceProvider } from 'src/api/api'
import { serviceProviderField } from '../customers/dummyList'
import { NoData, SpinnerView } from '../customers/Nodata'
export default function ServiceProvider() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)

    const getMySP = () => {
        setLoader(true)
        getAllServiceProvider().then((r) => {
            setLoader(false)
            setTableData(r.data.data)
        }).catch((e) => {
            setLoader(false)
            console.log(e)
        })
    }

    useEffect(() => {
        getMySP()
    }, [])

    return (
        <>

            <CInputGroup className="mb-3">
                <CFormInput placeholder="Search by Name or Email id or Phone number" aria-label="Name or Email id or Phone number" aria-describedby="button-addon2" />
                <CButton type="button" color="info" variant="outline" id="button-addon2">
                    <CIcon icon={cilSearch} />
                </CButton>
            </CInputGroup>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        {serviceProviderField.map((v, i) => <CTableHeaderCell key={i}>{v}</CTableHeaderCell>)}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        loader ?
                            <SpinnerView />
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
                                            <CFormSwitch id={`switchblock${index}`} type='checkbox' />
                                        </CTableDataCell>

                                    </CTableRow>
                                )) :
                                <NoData />
                    }
                </CTableBody>
            </CTable>
        </>
    )
}

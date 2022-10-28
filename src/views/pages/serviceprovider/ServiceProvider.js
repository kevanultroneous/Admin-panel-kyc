/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CFormInput, CFormSwitch, CInputGroup, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { customerSearch, getAllServiceProvider, setBlockOrUnblockUser } from 'src/api/api'
import AlertBox from '../customers/AlertBox'
import { serviceProviderField } from '../customers/dummyList'
import { NoData, SpinnerView } from '../customers/Nodata'
export default function ServiceProvider() {

    const [tableData, setTableData] = useState([])
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [titleOfModel, setTitleOfModel] = useState("Block")
    const [currentUser, setCurrentUser] = useState(null)

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

    const callBlockAction = (id) => {
        setBlockOrUnblockUser(id).then((r) => {
            getMySP()
            setVisible(false)
        }).catch((e) => {
            if (e.response) {
                toast.error(e.response.data.message)
            }
        })
    }

    const callSearch = (input) => {
        setLoader(true)
        setTimeout(() => {
            customerSearch({ searchText: input, searchField: "ServiceProvider" }).then((r) => {
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

    const handleBlockUnblock = (e) => {
        setVisible(true)
        if (e.target.checked) {
            setTitleOfModel("Block")
        } else {
            setTitleOfModel("Unblock")
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <AlertBox
                customTitle={titleOfModel + " Service Provider"}
                customBody={
                    <>
                        <h6>Are you sure to <b>{titleOfModel} {currentUser?.name}</b>  Service provider ?</h6>
                        {
                            titleOfModel === "Block" &&
                            <h6>This person will no longer be able to interact with you in KYC.</h6>
                        }
                    </>
                } visible={visible}
                onClose={() => setVisible(false)}
                onNo={() => setVisible(false)}
                onYes={() => callBlockAction({ userId: currentUser._id })} />

            <CInputGroup className="mb-3">
                <CFormInput
                    placeholder="Search by Name or Email id or Phone number"
                    aria-label="Name or Email id or Phone number"
                    aria-describedby="button-addon2"
                    onChange={(e) => callSearch(e.target.value.toString())}
                />
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
                                            <CFormSwitch id={`switchblock${index}`} type='checkbox'
                                                checked={item.isActive}
                                                onChange={(e) => {
                                                    setCurrentUser(item)
                                                    handleBlockUnblock(e)
                                                }}
                                            />
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

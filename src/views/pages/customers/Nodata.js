/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { CSpinner, CTableDataCell, CTableRow } from "@coreui/react"

export const NoData = () => {
    return (
        <CTableRow>
            <CTableDataCell colSpan={6} className="text-center">
                <h3>No data</h3>
            </CTableDataCell>
        </CTableRow>
    )
}

export const SpinnerView = () => {
    return (
        <CTableRow>
            <CTableDataCell colSpan={6} className="text-center">
                <CSpinner />
            </CTableDataCell>
        </CTableRow>
    )
}
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React from 'react'

const LayoutFilter = ({ children }) => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Filter data
                    </CCardHeader>
                    <CCardBody>
                        {children}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LayoutFilter

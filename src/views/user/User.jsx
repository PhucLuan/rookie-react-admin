import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import userApi from 'src/api/userApi'
import UserTable from './UserTable'

const User = () => {

    const [Users, setUsers] = useState();


    useEffect(() => {
        const fetchUserList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await userApi.getAll();
                setUsers(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchUserList();


    }, [])

    
    return (
        <>
            <div id='mymodal'></div>
            <CRow>
                <CCol xs="12" lg="2">
                    <CCardBody>
                        <CButton
                            // onClick={() => onAddUser()}
                            className="mr-1 btn-info"
                        >Add</CButton>
                    </CCardBody>
                </CCol>
                <CCol lg="4">
                    <CCardBody>
                        <CInputGroup>
                            <CInput placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <CInputGroupText>Search</CInputGroupText>
                        </CInputGroup>
                    </CCardBody>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Combined All Table
                        </CCardHeader>
                        <CCardBody>
                            {Users !== undefined && <UserTable listitem={Users}></UserTable>}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default User

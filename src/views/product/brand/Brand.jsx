import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import brandApi from 'src/api/brandApi'
import BrandForm from './BrandForm'
import BrandTable from './BrandTable'

const Brand = () => {

    const [isRefresh, setisRefresh] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [brandId, setbrandId] = useState()

    const [Brands, setBrands] = useState();

    const customStyles = {
        content: {
            top: '40%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%'
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        //setisRefresh(!isRefresh)
        setIsOpen(false);
    }

    function onAddBrand() {
        setbrandId(undefined)
        openModal();
    }

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await brandApi.getAll();
                setBrands(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, [isRefresh])

    const handleEditBrand = (Id) => {
        setbrandId(Id);
        openModal();
    }
    Modal.setAppElement('#root');
    return (
        <>
            <div id='mymodal'></div>
            <CRow>
                <CCol xs="12" lg="2">
                    <CCardBody>
                        <CButton
                            onClick={() => onAddBrand()}
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
                            {Brands !== undefined && <BrandTable listitem={Brands}
                                onEditMode={handleEditBrand}
                                handlerefreshDeleteItem={handlerefresh}></BrandTable>}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                {/* <button onClick={closeModal}>close</button> */}
                <div className='clearfix'></div>
                <BrandForm brandId={brandId} handlerefresh={handlerefresh} closeModal={closeModal}></BrandForm>
            </Modal>
        </>
    )
}

export default Brand

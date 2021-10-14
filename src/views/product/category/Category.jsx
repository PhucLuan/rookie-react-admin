import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import categoryApi from 'src/api/categoryApi'
import CategoryForm from './CategoryForm'
import CategoryTable from './CategoryTable'

const Category = () => {

    const [isRefresh, setisRefresh] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [categoryId, setcategoryId] = useState()

    const [Categories, setCategories] = useState();

    const customStyles = {
        content: {
            top: '45%',
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
        setIsOpen(false);
    }

    function onAddCategory() {
        setcategoryId(undefined)
        openModal();
    }

    const handlerefresh = () => {
        setisRefresh(!isRefresh);
    }

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await categoryApi.getAll();
                setCategories(response);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, [isRefresh])

    const handleEditCategory = (Id) => {
        setcategoryId(Id);
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
                            onClick={() => onAddCategory()}
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
                            {Categories !== undefined && <CategoryTable listitem={Categories}
                                onEditMode={handleEditCategory}
                                handlerefreshDeleteItem={handlerefresh}></CategoryTable>}
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
                <CategoryForm categoryId={categoryId} 
                handlerefresh={handlerefresh}
                categories={Categories}
                closeModal={closeModal}></CategoryForm>
            </Modal>
        </>
    )
}

export default Category

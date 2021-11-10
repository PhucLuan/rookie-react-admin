import { CButton, CCol, CFormGroup, CRow } from '@coreui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react'
import LayoutFilter from 'src/containers/LayoutFilter';
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField';

const mysortnameoptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'modifieddate', label: 'ModifiedDate' }
]
const mysorttypeoptions = [
    { value: true, label: 'Descending' },
    { value: false, label: 'Ascending' }
]
const ProductFilter = ({ Filterlist, initialFilter, handleSubmitForm }) => {
    return (
        <LayoutFilter name="Filter">
            {Filterlist === undefined ? '' :
                <Formik
                    initialValues={initialFilter}
                    onSubmit={(values) => handleSubmitForm(values)}
                >
                    {formikProps => {
                        // do something here ...
                        //const { values, errors, touched } = formikProps;
                        //console.log({ values, errors, touched });
                        return (
                            <>
                                <Form>
                                    <CRow>
                                        <CCol md={6}>
                                            <FastField
                                                name="orderProperty"
                                                component={SelectField}

                                                label="Sort by"
                                                placeholder="Select sort type"
                                                options={mysortnameoptions}
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <FastField
                                                name="desc"
                                                component={SelectField}

                                                label="Sort type"
                                                placeholder="Ahihi"
                                                options={mysorttypeoptions}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md={6}>
                                            <FastField
                                                name="keySearch"
                                                component={InputField}

                                                label="KeySearch"
                                                placeholder="KeySearch"
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <FastField
                                                name="limit"
                                                component={InputField}
                                                type="number"
                                                label="Item_per_page"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md={6}>
                                            <FastField
                                                name="brandId"
                                                component={SelectField}

                                                label="Brand"
                                                placeholder="What's your product brand?"
                                                options={Filterlist.brandList.map(
                                                    (category) => {
                                                        return (
                                                            { value: category.id, label: category.name }
                                                        )
                                                    }
                                                )}
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <FastField
                                                name="categoryId"
                                                component={SelectField}

                                                label="Category"
                                                placeholder="What's your product category?"
                                                options={Filterlist.categoryList.map(
                                                    (category) => {
                                                        return (
                                                            { value: category.id, label: category.name }
                                                        )
                                                    }
                                                )}
                                            />
                                        </CCol>
                                    </CRow>

                                    <CFormGroup>
                                        <CButton type="submit" color="primary">Search</CButton>
                                    </CFormGroup>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            }
        </LayoutFilter>
    )
}

export default ProductFilter

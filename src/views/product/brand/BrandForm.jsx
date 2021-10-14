import { CButton, CFormGroup } from '@coreui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react'
import InputField from 'src/custom-fields/InputField';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import brandApi from 'src/api/brandApi';

BrandForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool
}

BrandForm.defaultProps = {
    onSubmit: null,
}


function BrandForm({brandId, handlerefresh, closeModal}) {
    
    const isAddMode = !brandId;

    const editbrandmodel = useSelector(state => state.brand.brandObj)

    const initialValues = isAddMode ? {
        name: '',
        description: '',
    } : editbrandmodel;
    
    // const myoptions = [
    //     { value: '1', label: 'Chocolate' },
    //     { value: '2', label: 'Strawberry' },
    //     { value: '3', label: 'Vanilla' }
    // ]

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),

        // categoryId: Yup.number()
           // .required('This field is required.')
            //.nullable(),
    });
    const handleSubmitForm = (brand,{resetForm}) =>{
        if (isAddMode) {
            const postBrand = async () => {
                try {
                    await brandApi.post(brand)
                    .then((res)=>{
                        alert(res);
                        handlerefresh();
                    });
                    resetForm();
                    
                } catch (error) {
                    alert(error)
                }
            }
            postBrand();
        }
        else
            {
                const putBrand = () => {
                    try {
                        brandApi.put(brand)
                        .then((res)=>{
                            alert(res);
                            handlerefresh();
                        });
                        
                    } catch (error) {
                        alert(error)
                    }
                }
                putBrand();
            }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values,  { resetForm }) => handleSubmitForm(values,{resetForm})}
        >
            {formikProps => {
                // do something here ...
                const { values, errors, touched } = formikProps;
                console.log({ values, errors, touched });

                return (
                    <>
                        <h3>{isAddMode ? 'Add Brand' : 'Edit Brand'}</h3>
                        <Form>
                            <FastField
                                name="name"
                                component={InputField}
                                
                                label="Name"
                                placeholder="Eg: Wow nature ..."
                            />
                            <FastField
                                name="description"
                                component={InputField}

                                label="Description"
                                placeholder="Eg: Wow nature ..."
                            />
                            {/* <FastField
                                name="categoryId"
                                component={SelectField}

                                label="Category"
                                placeholder="What's your photo category?"
                                options={myoptions}
                            /> */}
                            <CFormGroup>
                                <CButton type="submit" color="primary">{isAddMode?'Add brand':'Save change'}</CButton>
                                {' '}
                                <CButton color="secondary" onClick={() => closeModal()}>Close</CButton>
                            </CFormGroup>
                        </Form>
                    </>
                );
            }}
        </Formik>
    )
}

export default BrandForm

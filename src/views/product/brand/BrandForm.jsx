import { CButton, CFormGroup } from '@coreui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react'
import InputField from 'src/custom-fields/InputField';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { onCreatebrand, onUpdatebrand } from 'src/Redux/brandSlice';

BrandForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool
}

BrandForm.defaultProps = {
    onSubmit: null,
}


function BrandForm({ brandId, closeModal }) {

    const isAddMode = !brandId;

    const editbrandmodel = useSelector(state => state.brand.brandObj)

    const initialValues = isAddMode ? {
        name: '',
        description: '',
    } : editbrandmodel;

    console.log('initialValues', initialValues)

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
    });
    const handleSubmitForm = (brand, { resetForm }) => {
        if (isAddMode) {

            dispatch(onCreatebrand(brand))
            resetForm();
        }
        else {
            dispatch(onUpdatebrand(brand))
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => handleSubmitForm(values, { resetForm })}
        >
            {formikProps => {
                // do something here ...

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

                            <CFormGroup>
                                <CButton type="submit" color="primary">{isAddMode ? 'Add brand' : 'Save change'}</CButton>
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

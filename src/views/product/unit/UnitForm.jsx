import { CButton, CFormGroup } from '@coreui/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react'
import InputField from 'src/custom-fields/InputField';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import unitApi from 'src/api/unitApi';

UnitForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool
}

UnitForm.defaultProps = {
    onSubmit: null,
}


function UnitForm({unitId, handlerefresh, closeModal}) {
    
    const isAddMode = !unitId;

    const editunitmodel = useSelector(state => state.unit.unitObj)

    const initialValues = isAddMode ? {
        name: '',
        description: '',
    } : editunitmodel;


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),

    });
    const handleSubmitForm = (unit,{resetForm}) =>{
        if (isAddMode) {
            const postUnit = async () => {
                try {
                    await unitApi.post(unit)
                    .then((res)=>{
                        alert(res);
                        handlerefresh();
                    });
                    //handlerefresh();
                    resetForm();
                    
                } catch (error) {
                    alert(error)
                }
            }
            postUnit();
        }
        else
            {
                const putUnit = () => {
                    try {
                        unitApi.put(unit)
                        .then((res)=>{
                            alert(res);
                            handlerefresh();
                        });
                        
                    } catch (error) {
                        alert(error)
                    }
                }
                putUnit();
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
                        <h3>{isAddMode ? 'Add Unit' : 'Edit Unit'}</h3>
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
                                <CButton type="submit" color="primary">{isAddMode?'Add unit':'Save change'}</CButton>
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

export default UnitForm

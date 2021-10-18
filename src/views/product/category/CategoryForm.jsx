import { CButton, CFormGroup } from '@coreui/react';
import { FastField, Field, Form, Formik } from 'formik';
import React from 'react'
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import categoryApi from 'src/api/categoryApi';

CategoryForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool
}

CategoryForm.defaultProps = {
    onSubmit: null,
}


function CategoryForm({categoryId, handlerefresh,categories, closeModal}) {
    
    const isAddMode = !categoryId;

    const editcategorymodel = useSelector(state => state.category.categoryObj)

    const initialValues = isAddMode ? {
        name: '',
        description: '',
        order:0,
        ispublish: false,
    } : editcategorymodel;
    

    const categoriesoption = categories.map(
        (category) => {return(
            {value: category.id, label: category.name}
        )}
    )

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),

        // categoryId: Yup.number()
           // .required('This field is required.')
            //.nullable(),
    });
    const handleSubmitForm = (category,{resetForm}) =>{
        if (isAddMode) {
            const postCategory = async () => {
                try {
                    await categoryApi.post(category)
                    .then((res)=>{
                        alert(res);
                        handlerefresh();
                    });
                    resetForm();
                    
                } catch (error) {
                    alert(error)
                }
            }
            postCategory();
        }
        else
            {
                const putCategory = () => {
                    try {
                        categoryApi.put(category)
                        .then((res)=>{
                            alert(res);
                            handlerefresh();
                        });
                        
                    } catch (error) {
                        alert(error)
                    }
                }
                putCategory();
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
                        <h3>{isAddMode ? 'Add Category' : 'Edit Category'}</h3>
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
                            <FastField
                                    name="order"
                                    component={InputField}
                                    type="number"
                                    label="Order"
                                />
                            <FastField
                                name="categoryId"
                                component={SelectField}

                                label="Category"
                                placeholder="What's your product category?"
                                options={categoriesoption}
                            />
                            <Field label="Publish" type="checkbox" name="ispublish" />
                            <CFormGroup>
                                <CButton type="submit" color="primary">{isAddMode?'Add category':'Save change'}</CButton>
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

export default CategoryForm

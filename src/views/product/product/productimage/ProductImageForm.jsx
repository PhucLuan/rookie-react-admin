import { CButton, CFormGroup, CLabel } from '@coreui/react';
import { FastField, Field, Form, Formik } from 'formik';
import React from 'react'
import InputField from 'src/custom-fields/InputField';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import productImageApi from 'src/api/productImageApi';
import ImageField from 'src/custom-fields/ImageField';

ProductImageForm.propTypes = {
    onSubmit: PropTypes.func,
    isAddMode: PropTypes.bool
}

ProductImageForm.defaultProps = {
    onSubmit: null,
}
const defaultImageSrc = "/avatars/defaultImage.jpg";

const initialProductValues = {
    imageFile: null,
    title: '',
    productId: 0,
    imageSrc: defaultImageSrc,
    ispublish: false,
    order: 0,
}

function ProductImageForm({ productImageId, handlerefresh, closeModal, productId }) {

    const isAddMode = !productImageId;

    const editproductImagemodel = useSelector(state => state.productImage.productImageObj)

    const initialValues = isAddMode ? initialProductValues : editproductImagemodel;

    const validationSchema = isAddMode ?
        Yup.object().shape({
            title: Yup.string().required('This field is required.'),
            imageFile: Yup.string().required('This field is required.')
        }) :
        Yup.object().shape({
            title: Yup.string().required('This field is required.'),
        });

    const handleSubmitForm = (productImage, { resetForm }) => {
        if (isAddMode) {
            const postProductImage = async () => {
                try {
                    //console.log({"product": productImage})
                    var data = new FormData();
                    data.append('ProductId', productId)
                    data.append('Title', productImage.title);
                    data.append('ImageFile', productImage.imageFile);
                    data.append('Ispublish', productImage.ispublish);
                    data.append('order', productImage.order);
                    await productImageApi.post(data)
                        .then((res) => {
                            alert(res);
                            handlerefresh();
                        });
                    resetForm();

                } catch (error) {
                    alert(error)
                }
            }
            postProductImage();
        }
        else {
            const putProductImage = () => {
                try {
                    //productImage.id = 
                    productImageApi.put(productImage)
                        .then((res) => {
                            alert(res);
                            handlerefresh();
                        });

                } catch (error) {
                    alert(error)
                }
            }
            putProductImage();
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
                const { values, errors, touched } = formikProps;
                console.log({ values, errors, touched });

                return (
                    <>
                        <h3>{isAddMode ? 'Add ProductImage' : 'Edit ProductImage'}</h3>
                        <Form>
                            <FastField
                                name="title"
                                component={InputField}

                                label="Title"
                                placeholder="Eg: Wow nature ..."
                            />
                            <CFormGroup>
                                <CLabel>IsPublish</CLabel>{' '}
                                <Field label="Publish" type="checkbox" name="ispublish" />
                            </CFormGroup>

                            <FastField
                                name="order"
                                component={InputField}
                                type="number"
                                label="Order"
                            />
                            {isAddMode ?
                                <FastField
                                    name="imageFile"
                                    component={ImageField}
                                    label="Upload Image"
                                    imageSrc={initialProductValues.imageSrc}
                                /> : ''
                            }

                            <CFormGroup>
                                <CButton type="submit" color="primary">{isAddMode ? 'Add productImage' : 'Save change'}</CButton>
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

export default ProductImageForm

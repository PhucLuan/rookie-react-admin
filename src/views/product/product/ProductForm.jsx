import { CButton, CFormGroup, CLabel } from '@coreui/react';
import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import productApi from 'src/api/productApi';
import InputField from 'src/custom-fields/InputField';
import SelectField from 'src/custom-fields/SelectField';
import * as Yup from 'yup';

const defaultImageSrc = "/avatars/defaultImage.jpg";

const initialProductValues = {
    //productid: 0,
    name: '',
    code: '',
    tag: '',
    categoryId: null,
    brandId: null,
    productId: 0,
    unitId: null,
    description: '',
    price: 0,
    discount: 0,
    imageSrc: defaultImageSrc,
    images: null,
    ispublish: 0,
    productStock: 0

}
const initialProductAddEdit = {
    ...initialProductValues,
    categoryList: [],
    brandList: [],
    unitList: []
}
const ProductForm = () => {

    const [productAddEdit, setproductAddEdit] = useState(initialProductAddEdit);
    const [isValueLoad, setisValueLoad] = useState(false);
    const { productId } = useParams();

    const isAddMode = !productId;
    const history = useHistory();

    const [isCoutinue, setisCoutinue] = useState(false)

    const [productAdded, setproductAdded] = useState()

    useEffect(() => {
        const fetchProductAddEdit = async () => {
            try {
                if (isAddMode) {
                    const response = await productApi.getAddEdit("{00000000-0000-0000-0000-000000000000}");
                    response.name = '';
                    response.tag = '';
                    response.code = '';
                    response.description = '';
                    setproductAddEdit(response);
                    //setisValueLoad(true);
                }
                else {
                    const response = await productApi.getAddEdit(productId);
                    setproductAddEdit(response);
                    console.log({ response })
                }

                setisValueLoad(true);

            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductAddEdit();
    }, [isAddMode, productId])

    const idDefault = '00000000-0000-0000-0000-000000000000';
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        code: Yup.string().required('This field is required.'),
        tag: Yup.string().required('This field is required.'),
        price: Yup.number().moreThan(0, 'Price must greater than 0'),
        discount: Yup.number().typeError('you must specify a number')
                              .min(0, 'discount must greater than or equal to 0')
                              .max(100, 'discount must less than or equal 100'),
        categoryId: Yup.string().notOneOf([idDefault], "This field is required"),
        brandId: Yup.string().notOneOf([idDefault], "This field is required"),
        unitId: Yup.string().notOneOf([idDefault], "This field is required"),
        productStock: Yup.number().min(0, 'productStock must greater than or equal 0'),
        //images: Yup.string().required('This field is required.'),

    });

    const handleSubmitForm = (product, { resetForm }) => {

        const postCategory = async () => {
            try {
                if (isAddMode) {
                    await productApi.post(product)
                        .then((res) => {

                            setproductAdded(res)
                            alert("Add Success");
                            if (!isCoutinue) {
                                resetForm();
                            }

                        });
                }
                else {
                    product.id = productId;
                    await productApi.put(product)
                        .then((res) => {
                            alert(res);

                        });
                }
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
        postCategory();
    }
    const SaveAndContinue = () => {
        setisCoutinue(!isCoutinue);
    }

    return !isValueLoad ? (<div>Loading...</div>) : (
        <>
            <Formik
                initialValues={productAddEdit}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => handleSubmitForm(values, { resetForm })}
            >
                {formikProps => {
                    // do something here ...
                    const { values, errors, touched } = formikProps;
                    console.log({ values, errors, touched });
                    return (
                        <>
                            <h3>{isAddMode ? 'Add Product' : 'Edit Product'}</h3>
                            {isAddMode && isCoutinue && productAdded &&
                                <CButton color="primary" onClick={() => history.push(`/product/product/productimage/${productAdded.id}`)}>
                                    Product Image
                                </CButton>}
                            {isAddMode ? '' :
                                <>
                                    <CButton color="primary" onClick={() => history.push(`/product/product/productimage/${productId}`)}>
                                        Product Image
                                    </CButton>
                                    {' '}
                                    <CButton color="primary" onClick={() => history.push(`/product/product/productcomment/${productId}`)}>
                                        Product Comment
                                    </CButton>
                                </>
                            }

                            <Form>
                                <FastField
                                    name="name"
                                    component={InputField}

                                    label="Name"
                                    placeholder="Eg: Wow nature ..."
                                />
                                <FastField
                                    name="code"
                                    component={InputField}

                                    label="Code"
                                    placeholder="Eg: Wow nature ..."
                                />
                                <FastField
                                    name="tag"
                                    component={InputField}

                                    label="Tag"
                                    placeholder="Eg: Wow nature ..."
                                />
                                <FastField
                                    name="description"
                                    component={InputField}

                                    label="Description"
                                    placeholder="Eg: Wow nature ..."
                                />
                                <FastField
                                    name="categoryId"
                                    component={SelectField}

                                    label="Category"
                                    placeholder="What's your product category?"
                                    options={productAddEdit.categoryList.map(
                                        (category) => {
                                            return (
                                                { value: category.id, label: category.name }
                                            )
                                        }
                                    )}
                                />
                                <FastField
                                    name="brandId"
                                    component={SelectField}

                                    label="Brand"
                                    placeholder="What's your product brand?"
                                    options={productAddEdit.brandList.map(
                                        (category) => {
                                            return (
                                                { value: category.id, label: category.name }
                                            )
                                        }
                                    )}
                                />
                                <FastField
                                    name="unitId"
                                    component={SelectField}

                                    label="Unit"
                                    placeholder="What's your product unit?"
                                    options={productAddEdit.unitList.map(
                                        (category) => {
                                            return (
                                                { value: category.id, label: category.name }
                                            )
                                        }
                                    )}
                                />
                                <FastField
                                    name="price"
                                    component={InputField}
                                    type="number"
                                    label="Price"
                                />
                                <FastField
                                    name="discount"
                                    component={InputField}
                                    type="number"
                                    label="Discount"
                                />
                                <FastField
                                    name="productStock"
                                    component={InputField}
                                    type="number"
                                    label="Product Stock"
                                />
                                <CFormGroup>
                                    <CLabel>IsPublish</CLabel>{' '}
                                    <Field label="Publish" type="checkbox" name="ispublish" />
                                </CFormGroup>
                                <CFormGroup>

                                    <CButton type="submit" onClick={() => SaveAndContinue()} color="primary">{'Save & Continue edit'}</CButton>
                                    {' '}
                                    <CButton type="submit" color="primary">{isAddMode ? 'Add product' : 'Save change'}</CButton>
                                    {' '}
                                    {isAddMode &&
                                        <CButton color="danger" onClick={() => formikProps.resetForm()}>
                                            Reset form
                                        </CButton>}
                                </CFormGroup>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </>
    )
}

export default ProductForm

import { CButton, CFormGroup } from '@coreui/react';
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
    productStock:0

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
    const {productId} = useParams();
    
    const isAddMode = !productId;
    const history = useHistory();

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
                else
                    {
                        const response = await productApi.getAddEdit(productId);
                        setproductAddEdit(response);
                        console.log({response})
                    }
                
                setisValueLoad(true);

            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductAddEdit();
    }, [isAddMode,productId])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        code: Yup.string().required('This field is required.'),
        tag: Yup.string().required('This field is required.'),
        price: Yup.number().required('This field is required.'),
        categoryId: Yup.string().required('This field is required.'),
        brandId: Yup.string().required('This field is required.'),
        unitId: Yup.string().required('This field is required.'),
                //images: Yup.string().required('This field is required.'),

    });
    
    const handleSubmitForm = (product, { resetForm }) => {
        console.log({product})
        const postCategory = async () => {
            try {
                if (isAddMode) {
                    var data = new FormData();
                data.append('name', product.name);
                data.append('code', product.code);
                data.append('tag', product.tag);
                data.append('categoryId', product.categoryId);
                data.append('brandId', product.brandId);
                data.append('unitId', product.unitId);
                data.append('description', product.description);
                data.append('price', product.price);
                data.append('discount', product.discount);
                data.append('images', product.images);
                data.append('productStock', product.productStock);
                data.append('ispublish', product.ispublish);
                await productApi.post(product)
                    .then((res) => {
                        alert(res);
                        resetForm();
                    });
                
                }
                else
                {
                    product.id = productId;
                    await productApi.put(product)
                    .then((res) => {
                        alert(res);
                        
                    });
                }                
            } catch (error) {
                alert(error)
            }
        }
        postCategory();
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
                            <h3>{isAddMode? 'Add Product' : 'Edit Product' }</h3>
                            {isAddMode? '' : 
                                <CButton color="primary" onClick={() => history.push(`/product/product/productimage/${productId}`)}>
                                    Product Image
                                </CButton>}
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
                                 <Field label="Publish" type="checkbox" name="ispublish" />
                                {/* <FastField
                                    name="images"
                                    component={ImageField}
                                    label="Upload Image"
                                    imageSrc = {initialProductValues.imageSrc}
                                /> */}
                                <CFormGroup>
                                    <CButton type="submit" color="primary">{isAddMode?'Add product':'Save change'}</CButton>
                                    {' '}
                                    {/* <CButton color="secondary" onClick={() => closeModal()}>Close</CButton> */}
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

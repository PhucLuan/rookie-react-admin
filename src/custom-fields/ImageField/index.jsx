import { CFormGroup, CInvalidFeedback, CLabel } from '@coreui/react';
import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import ImageControl from './ImageControl';


ImageField.defaultProps = {
    label: ''
}

function ImageField(props) {

    const { form, label, field, imageSrc } = props;
    const { name } = field;
    const { errors } = form;
    const showError = errors[name];
    const [imageFileShow, setimageFileShow] = useState(null);

    const onImageFileChange = (e) => {
        
        if (e.currentTarget.files[0] !== undefined) {
            setimageFileShow(e.currentTarget.files[0]);
            
            props.form.setFieldValue(`${name}`, e.currentTarget.files[0]);
        }
        else
        {
            setimageFileShow(null);
            props.form.setFieldValue(`${name}`, null);
        }
            

    }

    return (
        <CFormGroup>
            {label && <CLabel htmlFor={name}>{label}</CLabel>}
            <ImageControl
                id={name}
                {...field}
                imageSrc = {imageSrc}
                name={name}
                images={imageFileShow}
                className={showError ? 'is-invalid' : ''}
                onImageFileChange={onImageFileChange}
            />
            <ErrorMessage name={name} component={CInvalidFeedback} />
        </CFormGroup>
    );
}

export default ImageField;
import { CInput } from '@coreui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Thumb from './Thumb';

ImageControl.propTypes = {
    name: PropTypes.string,
    //imageFile: PropTypes.,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

ImageControl.defaultProps = {
    name: '',
    images: null,
    onImageFileChange: null,
    onRandomButtonBlur: null,
}

function ImageControl(props) {
    
    const { name, images, className,onImageFileChange, onInputBlur ,imageSrc} = props;
    
    return (
        <div className="Ahihihihi">
            <Thumb imageFile={images} initimageSrc={imageSrc}/>

            <CInput id={name} 
            name={name} 
            className= {className}
            type="file"
            onChange={onImageFileChange}
            onBlur={onInputBlur}/>
        </div>
    );
}

export default ImageControl;
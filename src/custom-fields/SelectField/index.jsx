import { CFormGroup, CInvalidFeedback, CLabel } from '@coreui/react';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function SelectField(props) {
    const { field, form, options, label, placeholder, disabled } = props;
    const { name, value } = field;
    
    const selectedOption = value === '00000000-0000-0000-0000-000000000000'?null: options.find(option => option.value+'' === value +'');
    
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
        
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    }

    return (
        <CFormGroup>
            {label && <CLabel htmlFor={name}>{label}</CLabel>}

            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}

                placeholder={placeholder}
                isDisabled={disabled}
                options={options}

                className={showError ? 'is-invalid' : ''}
            />

            <ErrorMessage name={name} component={CInvalidFeedback} />
        </CFormGroup>
    );
}

export default SelectField;
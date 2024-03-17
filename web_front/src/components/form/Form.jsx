import React from 'react';
import PropTypes from 'prop-types';

const Form = ({header, form}) => {
    return (
        <>
            <h2>
                {header}
            </h2>
            {form}
        </>
    );
};

Form.propTypes = {
    header: PropTypes.string,
    form: PropTypes.object
};

export default Form;

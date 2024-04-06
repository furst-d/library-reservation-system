import React from 'react';
import PropTypes from 'prop-types';

const AuthorPreview = ({id, name, lastName}) => {
    return (
        <div>

        </div>
    );
};

AuthorPreview.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
};

export default AuthorPreview;

import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const ErrorForm = ({errors}) => {
    const hasErrors = () => {
        return errors.length > 0;
    }

    return (
        <>
            {hasErrors()
                &&
                <ErrorListStyle>
                    {errors.map((error, index) => {
                        return (
                            <ErrorItemStyle key={index}>{error}</ErrorItemStyle>
                        )
                    })}
                </ErrorListStyle>
            }
        </>
    );
};

ErrorForm.propTypes = {
    errors: PropTypes.array
};

export default ErrorForm;

export const ErrorListStyle = styled.ul`
  list-style-position: inside;
  color: red;
`

export const ErrorItemStyle = styled.li`
  font-size: 16px;
  text-indent: -22px;
  margin-left: 22px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`

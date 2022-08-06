import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
    <button style={{ backgroundColor: props.color }} onClick={props.onClick} className="btn">
      {props.text}</button>
    );
  };

  Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  export default Button;

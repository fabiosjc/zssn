import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const Gender = props => {
  const { value } = props;

  return (
    <Fragment>
      {value === 'M' ? (
        <FontAwesomeIcon icon={faMars} color="#1696c9" size="lg" />
      ) : value === 'F' ? (
        <FontAwesomeIcon icon={faVenus} color="deeppink" size="lg" />
      ) : (
        'Not informed'
      )}
    </Fragment>
  );
};

export default Gender;

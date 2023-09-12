import React, { useEffect } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({ onClick }) {
 
  console.log(onClick);

  return <div className={styles['modal-overlay']} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};


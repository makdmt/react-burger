import React from "react";
import PropTypes from 'prop-types';

import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({closeFunction}) {

  return (
    <div className={modalOverlayStyles.ModalOverlay} onClick={closeFunction}></div>
  )
}

ModalOverlay.propTypes = {
  closeFunction: PropTypes.func,
}

export default ModalOverlay

import React from "react";
import PropTypes from 'prop-types';

import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({closeFunction, children}) {

  return (
    <div className={modalOverlayStyles.ModalOverlay} onClick={closeFunction}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  closeFunction: PropTypes.func,
  children: PropTypes.element
}

export default ModalOverlay

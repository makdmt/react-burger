import React, { FC, MouseEventHandler } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";


const ModalOverlay: FC<{ closeFunction: MouseEventHandler<HTMLElement> }> = ({ closeFunction }) => {
  return (
    <div className={modalOverlayStyles.ModalOverlay} onClick={closeFunction}></div>
  )
}

export default ModalOverlay

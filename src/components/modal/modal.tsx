import React, {FC, ReactPortal, ReactElement} from "react";
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css'

const rootHtml= document.getElementById('root') as HTMLElement;

interface IModal {
  props: {
    closeByEscFunc: () => void,
    closeByClickFunc: () => void,
    closeByXFunc: () => void,
  },
  children: ReactElement,
}

export const Modal = ({ props, children }: IModal): ReactPortal => {

  React.useEffect(() => {
    document.addEventListener("keydown", props.closeByEscFunc);
    return () => document.removeEventListener("keydown", props.closeByEscFunc);
  }, [])


  return ReactDOM.createPortal(
    (
      <div className={modalStyles.modalScreen}>
        <ModalOverlay closeFunction={props.closeByClickFunc} />
        <div className={modalStyles.popupContainer} >
          <button className={`${modalStyles.closeBtn}`} onClick={props.closeByXFunc}><CloseIcon type="primary" /></button>
          {children}
        </div>
      </div>
    )
    , rootHtml);
}


// Modal.propTypes = {
//   props: PropTypes.shape({
//   closeByEscFunc: PropTypes.func.isRequired,
//   closeByClickFunc: PropTypes.func.isRequired,
//   closeByXFunc: PropTypes.func.isRequired
//   }),

//   children: PropTypes.element
// }


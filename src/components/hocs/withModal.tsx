import React from "react";
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css'

const rootHtml = document.getElementById('root') as HTMLElement;

interface IWrappedComponentProps {
  closeByEsc: (event: React.KeyboardEvent) => void,
  closeByClickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void,
  closeByX: (event: React.MouseEvent<HTMLButtonElement>) => void,
}


const withModal = (WrappedComponent: React.ComponentType<IWrappedComponentProps>) => {
  return class WithModal extends React.Component<IWrappedComponentProps> {

    constructor(props: IWrappedComponentProps) {
      super(props);

      // this.closeByEsc = this.props.closeByEsc.bind(this);
    }

    // componentDidMount() {
    //   document.addEventListener("keydown", this.props.closeByEsc);
    // }

    // componentWillUnmount() {
    //   document.removeEventListener("keydown", this.props.closeByEsc);
    // }


    render() {
      return ReactDOM.createPortal(
        (
          <div className={modalStyles.modalScreen}>
            <ModalOverlay closeFunction={this.props.closeByClickFunc} />
            <div className={modalStyles.popupContainer} >
              <button className={`${modalStyles.closeBtn}`} onClick={this.props.closeByX}><CloseIcon type="primary" /></button>
              <WrappedComponent {...this.props as IWrappedComponentProps} />
            </div>
          </div>
        )
        , rootHtml);
    }
  }
}

// withModal.propTypes = {
//   closeByEsc: PropTypes.func.isRequired,
//   closeByClickFunc: PropTypes.func.isRequired,
//   closeByX: PropTypes.func.isRequired,
//   WrappedComponent: PropTypes.WrappedComponent
// }

export default withModal;

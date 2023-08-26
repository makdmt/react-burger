import React from "react";
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css'

const rootHtml = document.getElementById('root') as HTMLElement;

// how to type HOCs https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

interface IWrappedComponentProps {
  closeByEsc: (event: KeyboardEvent) => void,
  closeByClickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void,
  closeByX: (event: React.MouseEvent<HTMLButtonElement>) => void,
}


const withModal = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class WithModal extends React.Component<P & IWrappedComponentProps> {

    constructor(props: P & IWrappedComponentProps) {
      super(props);

      this.closeByEsc = this.props.closeByEsc.bind(this);
    }

    closeByEsc: (event: KeyboardEvent) => void;

    componentDidMount() {
      document.addEventListener("keydown", this.props.closeByEsc);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.props.closeByEsc);
    }


    render() {
      return ReactDOM.createPortal(
        (
          <div className={modalStyles.modalScreen}>
            <ModalOverlay closeFunction={this.props.closeByClickFunc} />
            <div className={modalStyles.popupContainer} >
              <button title='close' type='button' className={`${modalStyles.closeBtn}`} onClick={this.props.closeByX}><CloseIcon type="primary" /></button>
              <WrappedComponent {...this.props as P} />
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

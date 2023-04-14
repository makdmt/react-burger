import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { DELETE_INGREDIENT_DETAILS_FROM_MODAL } from '../../services/actions/burgerConstructor';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css'

const rootHtml = document.getElementById('root');

const withModal = WrappedComponent => {
  class Modal extends React.Component {

    constructor(props) {
      super(props);

      this.closeByEsc = () => this.props.dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });

      this.closeModalByClick = (event) => {
        event.currentTarget === event.target && this.props.dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });
      }

      this.closeModalByXbtn = (event) => {
        event.stopPropagation();
        this.props.dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });
      }

    }

    componentDidMount() {
      document.addEventListener("keydown", this.closeByEsc);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.closeByEsc);
    }

    render() {
      return ReactDOM.createPortal(
        // return (
        (
          <div className={modalStyles.modalScreen}>
            <ModalOverlay closeFunction={this.closeModalByClick} />
            <div className={modalStyles.popupContainer} >
              <button className={`${modalStyles.closeBtn}`} onClick={this.closeModalByXbtn}><CloseIcon type="primary" /></button>
              <WrappedComponent {...this.props} />
            </div>
          </div>


        )
        , rootHtml);
    }
  }
  return connect()(Modal)
}


// withModal.propTypes = {
//   closeByEsc: PropTypes.func.isRequired,
//   closeByClickFunc: PropTypes.func.isRequired,
//   closeByX: PropTypes.func.isRequired,
//   WrappedComponent: PropTypes.WrappedComponent
// }

export default withModal;
// export default

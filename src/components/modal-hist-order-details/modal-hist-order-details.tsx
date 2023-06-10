import React, {FC} from "react";

import { Modal } from "../modal/modal";
import { HistOrderDetails } from "../hist-order-details/hist-order-details";
import { useParams, useNavigate } from "react-router-dom";


export const ModalHistOrderDetails: FC = () => {

  const navigate = useNavigate();

  const closeByClickFunc = React.useCallback(() => {navigate(-1)},[navigate])
  const closeByXFunc = React.useCallback(() => {navigate(-1)},[navigate])
  const closeByEscFunc = React.useCallback(() => {navigate(-1)},[navigate])

  return (
      <Modal props={{closeByClickFunc, closeByXFunc, closeByEscFunc}}>
        <HistOrderDetails />
      </Modal>
    );
}


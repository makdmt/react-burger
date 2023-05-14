import React from "react";

import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useParams, useNavigate } from "react-router-dom";


export function ModalIngredientDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const closeByClickFunc = React.useCallback(() => {navigate(-1)},[navigate])
  const closeByXFunc = React.useCallback(() => {navigate(-1)},[navigate])
  const closeByEscFunc = React.useCallback(() => {navigate(-1)},[navigate])

  return (
      <Modal props={{closeByClickFunc, closeByXFunc, closeByEscFunc}}>
        <IngredientDetails id={id} />
      </Modal>
    );
}


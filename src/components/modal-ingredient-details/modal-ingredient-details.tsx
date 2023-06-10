import React, { FC } from "react";

import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ErrorShow } from "../error-show/error-show";
import { useParams, useNavigate } from "react-router-dom";


export const ModalIngredientDetails: FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const closeByClickFunc = React.useCallback(() => { navigate(-1) }, [navigate])
  const closeByXFunc = React.useCallback(() => { navigate(-1) }, [navigate])
  const closeByEscFunc = React.useCallback(() => { navigate(-1) }, [navigate])

  return (
    <Modal props={{ closeByClickFunc, closeByXFunc, closeByEscFunc }}>
      {id ? <IngredientDetails id={id} /> : <ErrorShow />}
    </Modal>
  );
}


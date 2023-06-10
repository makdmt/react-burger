import React, {ChangeEvent, FormEventHandler} from "react";

interface IFormInputsValues {
  [property: string]: string;
}

export function useForm(inputValues: IFormInputsValues): {
  values: IFormInputsValues,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onReset: FormEventHandler<HTMLFormElement>,
}

{
  const [values, setValues] = React.useState(inputValues);

  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  },[values]);

  const onReset = React.useCallback<FormEventHandler<HTMLFormElement>>((event)=> {
    event.preventDefault();
    setValues(inputValues)
  },[])

  return {values, onChange, onReset};
}

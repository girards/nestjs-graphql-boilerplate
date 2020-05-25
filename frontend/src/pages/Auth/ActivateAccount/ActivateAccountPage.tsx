import React from "react";
import { useActivateAccountForm } from "./useActivateAccountForm.hook";

const ActivateAccountPage: React.FunctionComponent = () => {
  const { onSubmit, register } = useActivateAccountForm();

  return (
    <div>
      Activate account
      <form onSubmit={onSubmit}>
        <input name="email" ref={register({ required: true })} />
        <input name="code" ref={register({ required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ActivateAccountPage;
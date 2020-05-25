import React from "react";
import { useForm } from "react-hook-form";
import { useLoginForm } from "./useLoginForm.hook";


const LoginPage: React.FunctionComponent = () => {
  const { register, onSubmit, errors } = useLoginForm();

  return (
    <div>
      login
      <form onSubmit={onSubmit}>
        {/* register your input into the hook by invoking the "register" function */}
        <input name="email" ref={register({ required: true })} />

        {/* include validation with required or other standard HTML validation rules */}
        <input type="password" name="password" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>)
}

export default LoginPage;
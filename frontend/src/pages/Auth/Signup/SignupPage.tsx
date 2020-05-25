import React from "react";
import { useSignupForm } from "./useSignupForm.hook";

const SignupPage: React.FunctionComponent = () => {
  const { register, onSubmit, errors } = useSignupForm();

  return (
    <div>
      signup
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

export default SignupPage;
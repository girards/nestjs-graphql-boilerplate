import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP } from "./context/queries";
import { signupVariables, signup } from "./context/types/signup";

type SignupFormData = {
  email: string;
  password: string;
};

export const useSignupForm = () => {
  const { register, handleSubmit, errors } = useForm<SignupFormData>();
  const [executeSignup] = useMutation<signup, signupVariables>(SIGNUP);
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await executeSignup({ variables: { email: email, password: password } })
  });

  return { register, onSubmit, errors }
}
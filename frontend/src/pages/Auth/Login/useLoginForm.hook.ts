import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "./context/queries";
import { loginVariables, login } from "./context/types/login";

type LoginFormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const [executeLogin] = useMutation<login, loginVariables>(LOGIN);
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await executeLogin({ variables: { email: email, password: password } })
    if (result.data?.login) {
      localStorage.setItem("token", result.data.login.access_token);
    }
  });

  return { register, onSubmit, errors }
}
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { ACTIVATE_USER } from "./context/queries";
import { activateUser, activateUserVariables } from "./context/types/activateUser";

type ValidateAccountFormData = {
  code: string;
  email: string;
};

export const useActivateAccountForm = () => {
  const { register, handleSubmit, errors } = useForm<ValidateAccountFormData>();
  const [executeValidateAccount] = useMutation<activateUser, activateUserVariables>(ACTIVATE_USER);

  const onSubmit = handleSubmit(async ({ email, code }) => {
    const result = await executeValidateAccount({ variables: { email, code } })
  });


  return { register, onSubmit }
}
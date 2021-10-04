import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../hooks/useAuth";

import { Button } from "../Button";
import { Input } from "../Input";

import styles from "./styles.module.scss";

interface Credentials {
  username: string;
  password: string;
}

const createUserFormSchema = yup.object({
  username: yup.string().required("E-mail obrigatório."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .min(6, "A senha deve conter 6 ou mais caracteres"),
});

export const SignInForm = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  async function handleSignIn(credentials: Credentials) {
    await signIn(credentials);
  }

  return (
    <div className={`${styles["wrapper-form"]} float-left`}>
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        <h1 className="title">Login</h1>
        <Input
          type="text"
          label="Usuário"
          id="username"
          error={errors.username}
          {...register("username")}
        />
        <Input
          type="password"
          label="Senha"
          id="password"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit">Entrar</Button>
      </form>
      <p>
        Esqueceu a senha?
        <Link to="esqueci-a-senha">Clique aqui</Link>
      </p>
      <div className={styles.registration}>
        <h1 className="title">Cadastre-se</h1>
        <p>
          Ainda não tem uma conta?
          <Link to="cadastrar">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Helper/error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css"; 

function LoginForm() {
  const username = useForm(false);
  const password = useForm(false);
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;
    userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <br />
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}> Ainda não possui conta?</h2>
        <p>ainda nao possui conta? cadastre-se no site</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        Criar Conta
      </Link>
    </section>
  );
}

export default LoginForm;

import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST } from "../../api";

function LoginForm() {
  const username = useForm("email");
  const password = useForm("password");

  React.useEffect(() => {
    const token = windoww.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }

  },[])
  
  async function getUser(token) {
    const {url, options} = USER_GET(token);
    const response = await fetch (url, options);
    const json = await response.json();
    
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;

    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem("token", json.token);
   
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <br />
        <Button>Entrar</Button>
        {/* <button type="submit">Login</button> */}
      </form>
      <Link to="/login/perdeu">Perdeu a senha?</Link>
      <br />
      <Link to="/login/criar">Criar Conta</Link>
    </section>
  );
}

export default LoginForm;

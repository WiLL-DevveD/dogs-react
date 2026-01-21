import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRespose = await fetch(url, options);
      if (!tokenRespose.ok) throw new Error(`error : ${tokenRespose.statusText}`);
      
      const { token } = await tokenRespose.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
      
    } catch (error) {
      setError(error.message);
      setLogin(false);
    }
    finally{
      setLoading(false);
    }
  }
  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
  
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const respToken = await tokenValidate(token);
          await getUser(token);
          console.log(respToken);
        } catch (error) {
          userLogout();
          console.log("Token inválido");
        }
        finally{
          setLoading(false);

        }
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const userRespose = await fetch(url, options);
    const json = await userRespose.json();

    setData(json);
    setLogin(true);
  }


  async function tokenValidate(token) {
    const { url, options } = TOKEN_VALIDATE_POST(token);

    const tokenRespose = await fetch(url, options);

    const json = await tokenRespose.json();
    return json;
  }
  return (
    <UserContext.Provider value={{ data, login, loading, error, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

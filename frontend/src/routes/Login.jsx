import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/AuthContext";

import api from "../axios/api";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const url = "/login";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await api.post(url, user);
      const token = response.data.token;
      if (token) {
        login(token);
     toast.success(response.data.message);
      }
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } 
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Faça agora o seu Login</h2>
      <div className="form-control">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <span>Email:</span>
            <input
              type="text"
              value={email}
              placeholder="Digite o seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            <span>Senha:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <p>Mostrar senha</p>
          </label>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

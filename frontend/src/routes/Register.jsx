import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../axios/api';
import { useState } from 'react';
import "./Register.css"

const url = "/register"

const Register = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      phone,
      password,
      confirmpassword
    }

 
  
    setLoading(true);
try {
     const response = await api.post(url, user);
      toast.success(response.data.message)
      if(response) {
           setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmpassword("");
    setLoading(false);

      }
      
     

} catch (error) {
    if (error.response?.data?.message) {
      setLoading(false);
      toast.error(error.response.data.message);
    } else {
      toast.error("Erro desconhecido.");
      setLoading(false);
    }
  } 
};
   


  return (
    <div>
      <ToastContainer/>
      <h2>Faça agora o seu registro</h2>
      <div className="form-control">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <span>Nome:</span>
            <input type="text" value={name} placeholder='Digite o seu nome' onChange={(e) => setName(e.target.value)}/>
          </label>
            <label htmlFor="email">
            <span>Email:</span>
            <input type="text" value={email} placeholder='Digite o seu email' onChange={(e) => setEmail(e.target.value)}/>
          </label>
            <label htmlFor="phone">
            <span>Número de telefone:</span>
            <input type="number" value={phone} placeholder='Digite o seu contato ex: (00) 9 8888-8888' onChange={(e) => setPhone(e.target.value)}/>
          </label>
            <label htmlFor="password">
            <span>Senha:</span>
            <input type={showPassword ? "text" : "password"} value={password} placeholder='Digite uma senha' onChange={(e) => setPassword(e.target.value)}/>
          </label>
            <label htmlFor="confirmpassword">
            <span>Confirmação de senha:</span>
            <input type={showPassword ? "text" : "password"} value={confirmpassword} placeholder='Confirme a senha' onChange={(e) => setConfirmpassword(e.target.value)}/>
          </label>
           <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <p>Mostrar senha</p>
          </label>
          {loading ? <button disabled>Carregando...</button> : (<button type='submit'>Registrar</button>)}
        </form>
      </div>
    </div>
  )
}

export default Register
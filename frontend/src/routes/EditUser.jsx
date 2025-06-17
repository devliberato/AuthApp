import { useEffect, useState } from "react";
import api from "../axios/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


import "./EditUser.css";

const EditUser = () => {



  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await api.get("/checkuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const user = response.data;
      
      setUserId(user._id);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setImageUrl(`${BASE_URL}/${user.image}`);
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    } 
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmpassword", confirmPassword);

    if (file) {
      formData.append("image", file); 
    }
  setLoading(true);
    try {
      const response = await api.patch(`/edit/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(response.data.message || "Usuário atualizado com sucesso.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao atualizar usuário.");
      setLoading(false);
    } 
  };
  console.log(imageUrl);

  return (
    <div>
      <ToastContainer />
      <h2>Edite a sua conta</h2>
      <div className="form-control">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <span>Nome:</span>
            <input
              type="text"
              value={name}
              placeholder="Digite o seu nome"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <span>Email:</span>
            <input
              type="text"
              value={email}
              placeholder="Digite o seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="phone">
            <span>Número de telefone:</span>
            <input
              type="text"
              value={phone}
              placeholder="Digite o seu contato ex: (00) 9 8888-8888"
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <span>Senha:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Digite a senha para atualizar"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmpassword">
            <span>Confirmação de senha:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirme a senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
            />
            <p>Mostrar senha</p>
          </label>
          <label htmlFor="image">
            <span>Imagem de perfil:</span>
            {imageUrl && (
              <div className="profile-image">
                <img src={imageUrl} alt="Imagem do perfil" />
              </div>
            )}
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Editar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

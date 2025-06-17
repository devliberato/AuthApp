import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className='home-container'>
      <h1>🔐 Sistema de Autenticação com JWT</h1>
      <p>
        Este projeto é uma aplicação fullstack que utiliza <strong>Node.js</strong>, <strong>Express</strong> e <strong>MongoDB</strong> no backend, e <strong>React</strong> no frontend.
      </p>
      <p>
        No backend, a API foi construída com autenticação segura usando <strong>JWT</strong> e upload de imagens com <strong>Multer</strong>.
      </p>
      <p>
        No frontend, usei <strong>react-router-dom</strong> para navegação com rotas privadas, <strong>Axios</strong> para comunicação com a API, <strong>React Toastify</strong> para exibir mensagens de sucesso e erro, e o <strong>Context API (useContext)</strong> para controlar o estado de autenticação do usuário e implementar o logout.
      </p>

      <ul>
        <li>✅ Registro de usuário</li>
        <li>✅ Login com validação</li>
        <li>✅ Upload de imagem de perfil</li>
        <li>✅ Rotas privadas protegidas</li>
        <li>✅ Controle de sessão com Context API</li>
        <li>✅ Feedback em tempo real com React Toastify</li>
      </ul>

      <p>
        Comece se <Link to="/register">registrando</Link> ou <Link to="/login">entrando</Link> com uma conta existente para explorar a aplicação.
      </p>
    </div>
  );
};

export default Home;


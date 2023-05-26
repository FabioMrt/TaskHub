import { useState } from "react"
import "./home.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const navigate = useNavigate();

        async function handleLogin(e){
            e.preventDefault();

        if(email !== '' && password !== '') {
           await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                //direcionar para /admin
                navigate('/admin', {replace: true})
            })
            .catch(()=> {
                //erro ao fazer login
            })
        }else{
            alert('Preencha todos os campos.');
        }

        }

        return (
            <div className="home-container">
              <h1 className="app-name">TaskHub</h1>
              <span className="app-description">Gerencie suas tarefas de forma fácil e prática.</span>
          
              <form className="form" onSubmit={handleLogin}>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Endereço de email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input-field2"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
          
                <button className="submit-button" type="submit">Acessar</button>
              </form>

            <Link className="btn-link" to="/cadastro">
                Não possui uma conta? Cadastre-se</Link>
            </div>
          );
        }
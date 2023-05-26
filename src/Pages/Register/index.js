import { useState } from "react"
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const navigate = useNavigate();

        async function handleRegister(e){
            e.preventDefault();

        if(email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
            .then(()=> {
                navigate('/admin', {replace: true})

            })
            .catch((error)=> {
                console.log('auth error', error)
                alert('Sua senha deve ter no mínimo 6 caracteres')
                //erro ao fazer o cadastro
            })
        }else{
            alert('Preencha todos os campos');
        }

        }

        return (
            <div className="home-container">
              <h1 className="app-name">Cadastro</h1>
              <span className="app-description">Crie sua conta</span>
          
              <form className="form" onSubmit={handleRegister}>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Digite seu email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Digite uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
          
                <button className="submit-button" type="submit">Cadastrar</button>
              </form>

            <Link className="btn-link" to="/">
                Já possui uma conta? Faça o login!</Link>
            </div>
          );
        }
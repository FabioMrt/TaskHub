/* eslint-disable no-unused-vars */
import './admin.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc,
        collection,
        onSnapshot,
        query,
        orderBy,
        where,
        doc,
        deleteDoc,
        updateDoc
    } from 'firebase/firestore';


export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({})
    const [tarefa, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    useEffect(()=> {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@userDetail")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"),
                where ("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];
                    snapshot.forEach((doc) =>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    setTarefas(lista);
                }) 
            }



        }

        loadTarefas();
    }, [])
  
    async function handleRegister(e) {
      e.preventDefault();
  
      if (tarefaInput === '') {     
        alert('Preencha o campo de tarefa');
        return;
      }

      if(edit?.id){
        handleUpdateTarefa();
        return;
      }



      await addDoc(collection(db, "tarefas"), {
        tarefa: tarefaInput,
        created: new Date(),
        userUid: user?.uid
      })
      .then(() => {
        setTarefaInput('')

      })
      .catch((error) => {
        console.log("Erro ao registar" + error)


      })

    }
  
    async function handleLogout(){
        await signOut(auth);

    }
    
    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)

    }

    function editTarefa(tarefa){
        setTarefaInput(tarefa.tarefa)
        setEdit(tarefa)
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) => {
            console.log("Erro ao atualizar tarefa" + error)
            setTarefaInput('')
            setEdit({})
        })


    }

    return (
      <div className="admin-container">
        <h1 className="app-name">Minhas tarefas</h1>
  
        <form className="form" onSubmit={handleRegister}>
          <textarea
            className="input-field"
            placeholder="Adicione uma nova tarefa"
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            style={{ height: "60px" }}
          />
  
          {Object.keys(edit).length > 0 ?
          (
            <button className="submit-button" type="submit">
            Atualizar tarefa
          </button>
          ) : (
            <button className="submit-button" type="submit">
            Adicionar
          </button>
          )}
        </form>

        {tarefa.map((tarefa) => (
            <article key={tarefa.id} className='list'>
            <p className="task-description">{tarefa.tarefa}</p>
            <div>
              <button onClick={() => editTarefa(tarefa)} className="task-button">Editar</button>
              <button onClick={ () => deleteTarefa(tarefa.id)} className="task-button btn-delete">Concluída</button>
            </div>
          </article>
        ))}

      <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    );
  }
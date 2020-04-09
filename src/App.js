import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() { 
    const response = await api.post('/repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "http//git",
	    techs: ["Node", "React"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`, {
      
    });
    const index = repositories.findIndex(repository => repository.id === id);

    repositories.splice(index, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button type="button" onClick={()=>handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

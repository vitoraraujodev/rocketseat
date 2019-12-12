import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...techs, newTech]);
    setNewTech('');
  }

  useEffect(() => { // ComponentDidMount
    const storageTechs = localStorage.getItem('techs');

    if(storageTechs) {
      setTech(JSON.parse(storageTechs));
    }
  }, []);

  useEffect(() => { // ComponentDidUpdate
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);


  const techsSize = useMemo(()=> techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techsSize} tecnologias</strong><br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;

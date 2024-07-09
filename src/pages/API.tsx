import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function API_page() {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');

  const handleGenerateKey = async () => {
    const tokenJwt = localStorage.getItem('token'); // Obtém o token do local storage
    if (!tokenJwt) {
      setError('Token de usuário não encontrado!');
      console.error('Token de usuário não encontrado!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/generate-access-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenJwt}`
        }
      });


      if (!response.ok) {
        alert("erro")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setSecretKey(data.token); // Supondo que a chave seja retornada no campo 'secret_key'
      setError('');
    } catch (error: any) {
      setError(`Erro ao gerar a chave secreta: ${error.message}`);
      console.error('Erro ao gerar a chave secreta:', error);
    }
  };

  return (
    <div>
      <h2>API Page</h2>
      <Button onClick={handleGenerateKey}>Create new secret key</Button>
      <p>{secretKey}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default API_page;
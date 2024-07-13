export const fetchApiKeys = async (setApiKeys: Function, setError: Function) => {
    const tokenJwt = localStorage.getItem('token');
    if (!tokenJwt) {
      setError('Token de usuário não encontrado!');
      console.error('Token de usuário não encontrado!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api-keys', {
        headers: {
          'Authorization': `Bearer ${tokenJwt}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setApiKeys(data);
    } catch (error: any) {
      setError(`Erro ao buscar as chaves de API: ${error.message}`);
      console.error('Erro ao buscar as chaves de API:', error);
    }
  };
  
export const FetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token do localStorage
  
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }
  
      const response = await fetch('http://localhost:3000/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envie o token no cabeçalho Authorization
          'Content-Type': 'application/json', // Defina o tipo de conteúdo para JSON, se necessário
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do usuário');
      }
  
      const data = await response.json();
      return data; // Retorna os detalhes do usuário obtidos da resposta
    } catch (error: any) {
      throw new Error(`Erro ao buscar detalhes do usuário: ${error.message}`);
    }
  };
  
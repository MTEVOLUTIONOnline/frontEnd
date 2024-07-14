// userService.ts

export async function getUserDetails(): Promise<any> {
  try {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch('http://localhost:3000/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Envie o token no cabeçalho Authorization
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do usuário');
    }

    const data = await response.json();
    return data; // Retorna os detalhes do usuário
  } catch (error: any) {
    throw new Error(error.message || 'Erro desconhecido');
  }
}
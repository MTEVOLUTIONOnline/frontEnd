// acesse/acesseCadastro.ts

interface RegisterResponse {
  token: string;
}

export async function registerUser(email: string, password: string): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: RegisterResponse = await response.json();
      localStorage.setItem('token', data.token);
      return 'bom'; // Indica sucesso no cadastro
    } else {
      return 'Falha no cadastro';
    }
  } catch (error) {
    console.error('Erro ao realizar cadastro:', error);
    return null;
  }
}
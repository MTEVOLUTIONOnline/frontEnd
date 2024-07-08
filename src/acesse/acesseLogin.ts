
interface LoginResponse {
    token: string;
  }
  
  export async function login(email: string, password: string): Promise<string | null> {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data: LoginResponse = await response.json();
        localStorage.setItem('token', data.token);
        return 'bom'; // Indica sucesso no login
      } else {
        return 'Credenciais inválidas';
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return null;
    }
  }
  
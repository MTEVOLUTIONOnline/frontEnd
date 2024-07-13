import { ApiKey } from "@/types";

export const handleGenerateKey = async (
  apiKeyName: string,
  setSecretKey: Function,
  setApiKeys: Function,
  setError: Function,
  setDialogOpen: Function
) => {
  const tokenJwt = localStorage.getItem('token');
  if (!tokenJwt) {
    setError('Token de usuário não encontrado!');
    console.error('Token de usuário não encontrado!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/generate-api-key', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenJwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: apiKeyName })
    });

    if (!response.ok) {
      alert("Erro ao gerar chave de API");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setSecretKey(data.apiKey);
    setApiKeys((prevKeys: ApiKey[]) => [...prevKeys, {
      id: Date.now(),
      key: data.apiKey,
      name: apiKeyName,
      createdAt: new Date().toISOString(),
      userId: 0
    }]);
    setError('');
    setDialogOpen(false);
  } catch (error: any) {
    setError(`Erro ao gerar a chave secreta: ${error.message}`);
    console.error('Erro ao gerar a chave secreta:', error);
  }
};

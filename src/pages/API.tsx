import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { CgTrashEmpty } from "react-icons/cg";
import { LuPen } from "react-icons/lu";

interface ApiKey {
  id: number;
  key: string;
  name: string; // Adicionando campo de nome
  createdAt: string;
  userId: number;
}

function API_page() {
  const [secretKey, setSecretKey] = useState<string>('');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState<string>('');
  const [apiKeyName, setApiKeyName] = useState<string>(''); // Estado para o nome da API Key
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Estado para o diálogo

  const handleGenerateKey = async () => {
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
        body: JSON.stringify({ name: apiKeyName }) // Enviando o nome da API Key
      });

      if (!response.ok) {
        alert("Erro ao gerar chave de API");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSecretKey(data.apiKey);
      setApiKeys(prevKeys => [...prevKeys, { id: Date.now(), key: data.apiKey, name: apiKeyName, createdAt: new Date().toISOString(), userId: 0 }]); // Adiciona nova chave à lista
      setError('');
      setDialogOpen(false); // Fechar o diálogo após a criação da chave
    } catch (error: any) {
      setError(`Erro ao gerar a chave secreta: ${error.message}`);
      console.error('Erro ao gerar a chave secreta:', error);
    }
  };

  const fetchApiKeys = async () => {
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

      const data: ApiKey[] = await response.json();
      setApiKeys(data);
    } catch (error: any) {
      setError(`Erro ao buscar as chaves de API: ${error.message}`);
      console.error('Erro ao buscar as chaves de API:', error);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return (
    <div className=''>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>Create new secret key</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Criar Nova Chave API</AlertDialogTitle>
            <AlertDialogDescription>
              Por favor, insira um nome para a nova chave API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <input
            type="text"
            placeholder="Nome da API Key"
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
            className="input-class" // Adicione a classe de estilo apropriada
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleGenerateKey}>Criar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <TableCaption>A list of your API keys.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.name}</TableCell>
              <TableCell>{key.key}</TableCell>
              <TableCell>{new Date(key.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <div className='flex gap-5 justify-end'>
                  <Button>
                    <LuPen />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger><Button variant={'destructive'}><CgTrashEmpty /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>deseija apagar {key.id} ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default API_page;

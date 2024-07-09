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
  createdAt: string;
  userId: number;
}

function API_page() {
  const [secretKey, setSecretKey] = useState<string>('');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState<string>('');

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
          'Authorization': `Bearer ${tokenJwt}`
        }
      });

      if (!response.ok) {
        alert("Erro ao gerar chave de API");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSecretKey(data.apiKey);
      setApiKeys(prevKeys => [...prevKeys, { id: Date.now(), key: data.apiKey, createdAt: new Date().toISOString(), userId: 0 }]); // Adiciona nova chave à lista
      setError('');
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
    <div>
      <Button onClick={handleGenerateKey}>Create new secret key</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <TableCaption>A list of your API keys.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.key}</TableCell>
              <TableCell>{new Date(key.createdAt).toLocaleString()}</TableCell>
              <TableCell>
              <div className='flex gap-5 justify-end'>
              <Button>
                <LuPen />
              </Button>
              
                {/* <CgTrashEmpty /> */}
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
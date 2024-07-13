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
import { Input } from '@/components/ui/input';
// import { ApiKey } from '@/types';
import { handleGenerateKey } from '@/acesse/handleGenerateKey';
import { deleteApiKey } from '@/acesse/deleteApiKey';
import { fetchApiKeys } from '@/acesse/fetchApiKeys';
import { ApiKey } from '@/types';
// import { fetchApiKeys } from '@/requests/fetchApiKeys';
// import { handleGenerateKey } from '@/requests/handleGenerateKey';
// import { deleteApiKey } from '@/requests/deleteApiKey';

function API_page() {
  const [secretKey, setSecretKey] = useState<string>('');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState<string>('');
  const [apiKeyName, setApiKeyName] = useState<string>(''); 
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchApiKeys(setApiKeys, setError);
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
          <Input
            type="text"
            placeholder="Nome da API Key"
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
            className="input-class"
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleGenerateKey(apiKeyName, setSecretKey, setApiKeys, setError, setDialogOpen)}>Criar</AlertDialogAction>
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
                  <AlertDialog>
                    <AlertDialogTrigger><Button variant={'outline'}><LuPen /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>deseija editar o nome {key.name} ?</AlertDialogTitle>
                        <AlertDialogDescription>
                         <Input placeholder='Novo Nome'/>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                        <AlertDialogAction onClick={() => deleteApiKey(key.id, setError)}>Continue</AlertDialogAction>
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

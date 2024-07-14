import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const UpdateUsernameCard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token do localStorage
      const response = await fetch('http://localhost:3000/users/name', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Envie o token no cabeçalho Authorization
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o nome de usuário');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Nome de Usuário</CardTitle>
        <CardDescription>Modificar nome de usuário</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Novo nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave}>Salvar</Button>
      </CardFooter>
      {message && <p>{message}</p>}
    </Card>
  );
};

export default UpdateUsernameCard;
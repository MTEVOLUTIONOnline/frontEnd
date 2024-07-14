import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const UserDetailsCard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [message, setMessage] = useState('');

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token do localStorage
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
      setUserDetails(data);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>Detalhes do Usuário</CardTitle>
        <CardDescription>Informações do usuário logado</CardDescription>
      </CardHeader>
      <CardContent>
        {userDetails ? (
          <div>
            <p><strong>ID:</strong> {userDetails.id}</p>
            <p><strong>Nome:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            {/* Adicione outros detalhes do usuário conforme necessário */}
          </div>
        ) : (
          <p>Carregando detalhes do usuário...</p>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={fetchUserDetails}>Recarregar</Button>
      </CardFooter>
      {message && <p>{message}</p>}
    </Card>
  );
};

export default UserDetailsCard;
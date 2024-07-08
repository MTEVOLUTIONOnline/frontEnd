// Login.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../acesse/acesseLogin'; // Importe a função de login
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import Spinner from '@/components/Spinner'; // Importe o spinner
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import Spinner from '@/components/ui/Spinner';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(4, { message: 'Senha deve ter pelo menos 4 caracteres' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true);
    const { email, password } = data;
    const loginResult = await login(email, password);

    if (loginResult === 'bom') {
      clearErrors(); // Limpa qualquer erro existente
      navigate('/'); // Redireciona para a página inicial
    } else {
      setError('root', { message: loginResult || 'Erro desconhecido' });
    }
    setIsLoading(false);
  };

  return (
    <div className='bg-zinc-950 text-zinc-50 flex justify-center items-center h-screen'>
      <form className='w-full max-w-xs grid gap-7' onSubmit={handleSubmit(handleLogin)}>
        <div>
          <h2 className='font-bold text-2xl'>Login</h2>
        </div>
        <div className='grid gap-2'>
          <label>Email:</label>
          <Input type='email' className='p-1 bg-zinc-50 text-zinc-900 pl-2 border border-r-zinc-50' {...register('email')} />
          {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
        </div>
        <div className='grid gap-2'>
          <label>Password:</label>
          <Input type='password' className='p-1 bg-zinc-50 text-zinc-900 pl-2 border border-r-zinc-50' {...register('password')} />
          {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
        {errors.root && <p>{errors.root.message}</p>}
        <Button className='bg-emerald-500 hover:bg-emerald-600' type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Entrar'}
        </Button>
        <p className='text-center'>Não tem uma conta? <a className='text-blue-600' href="/Cadastro">Crie uma conta</a></p>
      </form>
    </div>
  );
}

export default Login;
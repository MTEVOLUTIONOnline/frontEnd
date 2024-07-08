// Cadastro.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '../acesse/acesseCadastro'; // Importe a função de cadastro
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/Spinner';
// import Spinner from '@/components/Spinner'; // Importe o 


// Define o esquema de validação usando zod
const registerSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(4, { message: 'Senha deve ter pelo menos 4 caracteres' }),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

function Cadastro() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    const { email, password } = data;
    const registerResult = await registerUser(email, password);

    if (registerResult === 'bom') {
      clearErrors(); // Limpa qualquer erro existente
    } else {
      setError('root', { message: registerResult || 'Erro desconhecido' });
    }
    setIsLoading(false);
  };

  return (
    <div className='bg-zinc-950 text-zinc-50 flex justify-center items-center h-screen'>
      <form className='w-full max-w-xs grid gap-7' onSubmit={handleSubmit(handleRegister)}>
        <div>
          <h2 className='font-bold text-2xl'>Cadastro</h2>
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
          {isLoading ? <Spinner /> : 'Cadastrar'}
        </Button>
        <p className='text-center'>Já tem uma conta? <a className='text-blue-600' href="/login">Faça login</a></p>
      </form>
    </div>
  );
}

export default Cadastro;
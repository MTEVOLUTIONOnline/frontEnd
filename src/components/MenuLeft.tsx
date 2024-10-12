import React from 'react';
import { Button } from './ui/button';

function MenuLeft() {
    return (
        <div>
            <div>
                <img src="https://mozexames.com/static/media/logo.579a0788.png" width={'65px'} alt="" />
            </div>
            <div className='mt-10'>
                <h1 className='text-4xl font-bold text-gray-700 mb-10'>Explica Moçambique</h1>
                <h3>Ola caro estudante. Estás a procura de exames nacionais para estudar? Estás na página certa! <u>Bons estudos.</u> </h3>
                <Button className='mt-10'><a href="/About">Informacoes</a></Button>
                <ul className='mt-5 grid gap-5'>
                    <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/ResolverExame">Resolver Exame</a></li>
                    <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/SubjectHelp">Ajuda do assunto</a></li>
                    <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/Cronograma">Cronograma</a></li>
                </ul>
            </div>
        </div>
    );
}

export default MenuLeft;


export function MenuUL() {
    return (
        <>
            <ul className='mt-5 grid gap-5 overflow-auto'>
                <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/ResolverExame">Resolver Exame</a></li>
                <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/SubjectHelp">Ajuda do assunto</a></li>
                <li className='border-gray-500 border hover:border-2 p-4 text-[20px] rounded-lg hover:border-green-500 cursor-pointer hover:bg-green-400/10'><a href="/Cronograma">Cronograma</a></li>
            </ul>
        </>
    )
}
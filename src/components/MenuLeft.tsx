import { MenuUL } from './Menuul';
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
                <MenuUL />
            </div>
        </div>
    );
}

export default MenuLeft;

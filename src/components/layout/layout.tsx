import MenuLeft from '../MenuLeft';
import { Button } from '../ui/button';
import { MenuSheet } from '../sheet';

export function Layout({ children  }: any) {
    return (
        <>
            <div className='flex'>
                <div className='menuLeft h-[100vh] bg-zinc-200 w-[65%] py-16 px-16'>
                    <MenuLeft />
                </div>
                <main className='main h-[100vh] bg-zinc-800 w-full py-16 px-20'>
                    <Button className="MenuBlock mb-5"><MenuSheet /></Button>
                    {children }
                </main>
            </div>
        </>
    );
}

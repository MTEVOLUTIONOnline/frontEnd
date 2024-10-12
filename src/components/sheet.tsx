import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MenuUL } from "./Menuul"

export function MenuSheet() {
    return (
        <>
            <Sheet>
                <SheetTrigger> <HamburgerMenuIcon /> </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetDescription>
                            <div className="h-full flex flex-col">
                                <div>
                                    <img src="https://mozexames.com/static/media/logo.579a0788.png" width={'65px'} alt="" />
                                </div>
                                <div className='mt-10 flex-grow overflow-y-auto'>
                                    <h1 className='text-4xl font-bold text-gray-700 mb-10'>Explica Moçambique</h1>
                                    <MenuUL />
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}
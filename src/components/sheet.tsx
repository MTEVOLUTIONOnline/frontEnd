import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import MenuLeft from "./MenuLeft"


export function MenuSheet() {

    return (
        <>
            <Sheet>
                <SheetTrigger> <HamburgerMenuIcon /> </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <MenuLeft />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </>
    )
}
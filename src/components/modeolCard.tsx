
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

export function ModeolCard()
{


  return (

    <>
      <div className="flex w-full h-full gap-5">
        <div className="w-[400px]" >
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="email">Model</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="afri'ia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>escolhas Modelo</SelectLabel>
                    <SelectItem value="apple">GPT - 4</SelectItem>
                    <SelectItem value="banana">mtevolution</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid mb-7 mt-7  w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Temperature">Temperature</Label>
              <Input type="number" id="Temperature" placeholder="Temperature" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="TopP">Top P</Label>
              <Input type="number" id="TopP" value={'22'} placeholder="Top P" />
            </div>

        </div>
        <div className="grid flex-col   w-full h-full">
          <div className="verflow-auto h-[50vh]">
           
            <div className="w-[90%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque optio minima non perferendis quam magnam. Quisquam necessitatibus laboriosam molestiae ut hic officiis. Vitae a sit modi id dolores, eius temporibus eum dolor et quis autem ullam molestiae cupiditate fugit adipisci aspernatur dicta dolore! Assumenda iusto impedit voluptate, enim suscipit doloremque!
            </div>
          </div>
          <div className="">
            <Textarea className="bg-zinc-900 h-[100px] text-white" />
            <Button className="mt-5">Enviar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
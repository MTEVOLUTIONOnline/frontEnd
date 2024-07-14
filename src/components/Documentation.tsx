import { GoCopy } from "react-icons/go";
  


  export function DOC_componente()
  {
    
  
    return (
  
      <>
        <div className="w-[80%]">
            <div className="flex items-center justify-between bg-zinc-900 rounded-lg text-white p-3">
                <div>
                    <h3>pip install request</h3>
                </div>
                <div>
                    <GoCopy className="cursor-pointer" />
                </div>
            </div>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Código Python Exemplo</h2>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          from openai import OpenAI

          client = OpenAI(
            organization='org-KddDUyHUhAg4v56e9N7RRH8r',
            project='$PROJECT_ID',
          )
        </pre>
       
          Iniciar Stream
      </div>
    </div>
        </div>
 
      </>
    )
  }
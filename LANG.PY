import re

# Dicionário para armazenar variáveis
variables = {}

# Função para executar o comando MTPRINT
def execute_print(command):
    pattern = r'MTPRINT\("(.+?)"\)'
    match = re.match(pattern, command)
    if match:
        message = match.group(1)
        print(message)
    else:
        print("Comando MTPRINT não reconhecido")

# Função para executar o comando mIF
def execute_if(command):
    pattern = r'mIF\s*\((.+?)\)\s*\{(.+?)\}'
    match = re.match(pattern, command, re.DOTALL)
    if match:
        condition = match.group(1).strip()
        block = match.group(2).strip()

        # Avaliando a condição
        try:
            condition_result = eval(condition, {}, variables)
            if condition_result:
                # Executando o bloco de comandos
                exec(block, {}, variables)
            return condition_result
        except Exception as e:
            print(f"Erro na avaliação da condição: {e}")
            return False
    else:
        print("Comando mIF não reconhecido")
        return False

# Função para executar o comando Mvar
def execute_var(command):
    pattern = r'Mvar\s*=\s*(.+)'
    match = re.match(pattern, command)
    if match:
        value = match.group(1).strip()
        variables["Mvar"] = eval(value, {}, variables)
    else:
        print("Comando Mvar não reconhecido")

# Função principal para ler e executar comandos
def main():
    while True:
        try:
            command = input("Digite um comando: ")
            if command.strip().lower() == "sair":
                break
            elif command.startswith("MTPRINT"):
                execute_print(command)
            elif command.startswith("mIF"):
                result = execute_if(command)
                print(f"Condição resultou em: {result}")
            elif command.startswith("Mvar"):
                execute_var(command)
            else:
                print("Comando não reconhecido")
        except EOFError:
            break

if __name__ == "__main__":
    main()

# Notas

## 07/09/2024 09:56

### Para segunda

* Remover paciente
* Cores dos cards por prioridade
* Filtro
* Atualizar paciente

## 02/09/2024 14:14

* Em telas pequenas: item da lista → cartão
* Falta
    * Pesquisa
    * Filtro
    * Atualizar fila localmente ao atualizar/adicionar paciente

## 13/08/2024 15:16

### Componentes

* Navbar
    * Início
    * Modal configurações: novo procedimento (s), listar procedimentos
    * Entrar/Sair
* Lista
    * Filtro
    * Pesquisa
    * Item: Info. paciente e procedimento (p), alterar de acordo com filtro selecionado
* Modal cadastro paciente
* Modal detalhes do procedimento
* Tela login
* Cadastro procedimento

### Entidades

* Usuário
    * CPF
    * Senha
    * Permissões

* Paciente
    * Nome
    * CPF
    * Nº SUS
    * Telefone
    * Procedimento (s)
    * Prioridade
    * Data de entrada
    * Estado do processo
    * Data de retirada
    * Quem retirou

* Procedimento (s)
    * Nome do procedimento
    * Local (município ou policlínica)

## 12/08/2024 14:01

### Cronograma

Ficar pronto até dia 16/09

### Ajustes

* Remover tela inicial (ir direto para fila)
* Configurações
    * Página para gerenciar procedimentos
* Fila
    * Pesquisa (CPF, NSUS*) 
    * Modal para cadastrar paciente
    * Modal para visualizar detalhes do procedimento (Detalhes, Atualizar*, Remover)
    * Filtro por procedimentos
    * (Tabela dinâmica → filtro)*

### Atualizar

* Trocar número SUS por CPF

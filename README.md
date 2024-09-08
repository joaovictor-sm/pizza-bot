# Gerenciamento de Estoque de Pizzaria com Chatbot

## Objetivo
Os candidatos devem criar um workflow usando Dify.AI que permita que um chatbot gerencie o estoque de uma pizzaria. Quando um cliente faz um pedido através do chatbot, o sistema deve atualizar o inventário da pizzaria no banco de dados Postgres, refletindo o consumo dos ingredientes.

## Requisitos do Projeto

### 1. Configuração Inicial

- [x] Criar um projeto em Next.js 14 com uma API que se conecte a um banco de dados Postgres.
- [x] Configurar o banco de dados Postgres com tabelas para:
  - Estoque: nome do ingrediente, quantidade disponível, unidade de medida.
  - Pedidos: id do pedido, itens do pedido, data e hora, situação.

### 2. Desenvolvimento do Workflow no Dify.AI

- [x] Usar o plano gratuito do Dify.AI para criar um chatbot que receba pedidos de clientes.
- [x] O chatbot deve ser capaz de:
  - [x] Entender pedidos de pizza com base nos ingredientes disponíveis.
  - [x] Consultar o estoque atual para verificar se há ingredientes suficientes para o pedido.
  - [x] Atualizar o banco de dados Postgres reduzindo a quantidade de ingredientes conforme o pedido.

### 3. Fluxo de Trabalho

- [x] Pedido do Cliente: O cliente interage com o chatbot para fazer um pedido de pizza.
- [x] Verificação de Estoque: O chatbot realiza uma requisição HTTP para o backend em Next.js que consulta o banco de dados Postgres para verificar a disponibilidade dos ingredientes.
- [x] Resposta ao Cliente: Se os ingredientes estiverem disponíveis, o chatbot confirma o pedido e atualiza o estoque. Caso contrário, informa a indisponibilidade ao cliente.
- [x] Atualização de Estoque: O backend em Next.js atualiza o banco de dados Postgres reduzindo a quantidade de ingredientes usados.

### 4. Funcionalidades Adicionais

- [x] Criar uma interface simples para que o gerente da pizzaria possa ver o estoque atual e os pedidos realizados.
- [ ] Implementar um sistema de notificações no chatbot para alertar o gerente quando um ingrediente estiver próximo de acabar.
- [x] Pode utilizar [https://v0.dev](https://v0.dev) para criar a interface.

### 5. Instruções para os Candidatos

- [x] Use Dify.AI para criar o chatbot e gerenciar o fluxo de conversas.
- [x] Utilize os 200 créditos grátis no Dify.AI para testar e melhorar o comportamento da IA no gerenciamento de pedidos e estoque.
- [x] Implementar o backend em Next.js 14 para lidar com as requisições HTTP e interagir com o banco de dados Postgres.
- [x] Caso os créditos do Dify.AI não sejam suficientes, entre em contato para providenciar mais créditos: mateus@qu1ck.com.br

## Entrega do Projeto

- [ ] A entrega deve ser feita utilizando um software de gravação de vídeo. O vídeo deve mostrar o funcionamento completo do projeto, com uma explicação clara e objetiva, de no máximo 2:30 minutos.
- [ ] O vídeo deve ser enviado utilizando uma ferramenta de armazenamento em nuvem, como o Google Drive ou qualquer outra similar.

## Critérios de Avaliação

- [x] Funcionamento Completo do Workflow: O chatbot deve ser capaz de gerenciar o estoque conforme os pedidos dos clientes.
- [x] Criatividade no Uso de IA: Uso criativo dos recursos de IA fornecidos pelo Dify.AI.
- [ ] Qualidade do Código: Organização, clareza, e documentação do código.
- [x] Usabilidade: Gerenciamento de estoque e pedidos.

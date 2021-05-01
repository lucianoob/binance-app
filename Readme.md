# Binance App

Teste de um app para consumir a API da Binance.

## Pré-Requisitos

Para rodar o projeto deve-se utilizar os seguintes requisitos:
- Nodejs 
- NPM

## Componentes

Os componentes utilizados neste projeto são:
- Nodejs v14.15.5
- NPM v6.14.11
- EJS v3.1.6
- Express v4.17.1
- Node Binance API v0.12.5
- Node Localstorage v2.1.6
- Nodemon v2.0.7


## Instalação

Para instalar basta rodar os comandos abaixo, lembrando que é necessário ter todos os pré-requisitos instalados.
- npm i
- Para usar as chaves da Binance em variáveis de ambiente:
    - Copie o arquivo .env-example para .env inserindo suas chaves de API da Binance.
- Para usar as chaves em storage local:
    - Use o formulário da página de start.

### Execução

- npm start (produção)
- npm run dev (desenvolvimento)
- Acesse [http://localhost:8080](http://localhost:8080)

## Funcionalidades

Este teste tem as seguintes funcionalidades:
- Foi criado para testar o acesso a API da Binance, checando sua estabilidade e funcionalidades.
- Este app foi separado em 4 abas para exibir:
    - Start: insira as chaves da API da Binance.
    - Dashboard: os seus tokens e seu ticket médio em cada um deles.
    - Wallet: os seus tokens em sua carteira e suas ordens pendentes.
    - History: o seu histórico considerando as suas moedas em sua carteira.

## Telas

### Start
![Start](/images/app_binance-01.png)

### Dashboard
![Dashboard](/images/app_binance-02.png)

### Wallet
![Wallet](/images/app_binance-02.png)

### History
![History](/images/app_binance-03.png)
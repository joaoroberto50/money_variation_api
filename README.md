# Money Variation API v.1.0.0

[Uma api que atualiza e gerencia a cotação de moedas imaginarias]

## Funcionalidades

- Atualização aleatória dos valores das moedas imaginárias a cada hora.
- Endpoint para obter a lista de todas as moedas e seus valores atualizados.
- Endpoint para obter detalhes de uma moeda específica existente.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [Swagger](https://swagger.io/)

## Configuração e Execução

Para executar a aplicação localmente, siga as etapas abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/joaoroberto50/money_variation_api
cd money-variation-api
```

Instale as dependências do projeto:
```
npm install
```

Inicie o banco de dados com as migrações do Prisma:
```
npx prisma migrate dev
```

Importe os dados iniciais para o banco de dados:
```
sqlite3 ./prisma/dev.db < ./prisma/init.sql
```

Inicie a aplicação:
```
npm run start
```
A aplicação estará disponível em http://localhost:3000.

## Documentação da API
A API está documentada usando o Swagger. Para acessar a documentação, acesse:

- Em ambiente local: http://localhost:3000/api
- Em ambiente de produção: https://money-variation-api.onrender.com/api

## Deploy
A aplicação foi implantada no Render e está disponível em https://money-variation-api.onrender.com/.

## Formato dos Dados
Os endpoints retornam os dados no seguinte formato:
```
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "ABC",
    "current_value": 2.4501,
    "previous_value": 2.5222,
    "variation": -0.0286,
    "status": "devalued",
    "last_update": "2023-07-14T02:01:17.143Z"
  }
}
```
## Observações
A aplicação lê os dados do banco de dados apenas na inicialização e trabalha com todos os dados em memória. Somente durante a atualização (a cada hora) os registros são atualizados no banco de dados.
A aplicação é projetada para trabalhar com poucos registros.

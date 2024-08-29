# Weather360 Pro
Este aplicativo permite ao usuário buscar informações meteorológicas de uma cidade específica, utilizando a API do OpenWeatherMap. 


# Documentação: Tratamento de Erros ao Fazer Requisição à API do OpenWeatherMap

## Requisitos

### 1. Verificação de Campo Preenchido

- **Objetivo:** Garantir que o usuário preencha o campo de entrada antes de enviar a requisição.
- **Mensagem de Erro:** Se o campo de entrada estiver vazio, exiba a mensagem: **"Por favor, digite o nome de uma cidade."**

### 2. Feedback ao Usuário Após Envio de Requisição à API

#### 2.1. Verificação do Status da Resposta 404

- **Objetivo:** Informar ao usuário se a cidade digitada não for encontrada na base de dados da API.
- **Mensagem de Erro:** Se a resposta da API for `404`, exiba a mensagem: **"Cidade não encontrada. Por favor, verifique o nome e tente novamente."**

#### 2.2. Erros do Axios

- **Objetivo:** Tratar erros específicos do Axios, como problemas de rede ou erros internos da API, que não sejam relacionados a um status `404`.
- **Mensagem de Erro:** Para erros diferentes de `404`, exiba a mensagem: **"Erro ao buscar os dados do clima. Tente novamente mais tarde."**

#### 2.3. Erros Não Relacionados

- **Objetivo:** Capturar e tratar erros que podem ocorrer fora dos contextos acima, como erros inesperados em outras partes do código.
- **Mensagem de Erro:** **"Ocorreu um erro inesperado."**


## Melhorias na Experiência do Usuário

Para melhorar a usabilidade da aplicação e retornar o nome dos países, e não somente as siglas, criei, com a ajuda do ChatGPT, um [arquivo que mapeia](https://github.com/severidade/weather360-pro/blob/main/src/utils/countries.tsx) cada sigla de país para o nome completo correspondente, cobrindo todas as nações reconhecidas pela ISO 3166-1.

Importei o arquivo com o mapeamento no componente [DailyWeather](https://github.com/severidade/weather360-pro/blob/main/src/components/DailyWeather/index.tsx) e o utilize para obter o nome completo do país com base na sigla fornecida pela API.

### Exemplo de Código

```typescript
const countryName = countryMapping[data.sys.country] || data.sys.country;
```

O código acima verifica diretamente se a sigla do país ``data.sys.country`` existe como uma chave no objeto ``countryMapping``. Se encontrar a chave, retorna o valor correspondente ao nome completo do país. Caso não encontre, retorna a própria sigla do país.

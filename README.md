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

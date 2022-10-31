# DART - TEMPLATE FRONTEND

[![R|REACT](https://img.shields.io/static/v1?label=react&message=framework&color=blue&style=for-the-badge&logo=REACT)](https://pt-br.reactjs.org/)

Templete base para desenvolvimento de aplicações frontend com React e Typescript.
**Mantido por:** [DART DIGITAL | Soluções e Consultoria](https://www.dartdigital.com.br/)
**Data de criação:** 28/03/2022

---

Algumas libs utilizadas no projeto:

-   [REACT](https://pt-br.reactjs.org/)
-   [MATERIAL-UI](https://mui.com/)
-   [YARN](https://yarnpkg.com/)
-   [AXIOS](https://axios-http.com/ptbr/docs/intro)
-   [REACT-HOT-TOAST](https://react-hot-toast.com/)
-   [REACT-INTL](https://formatjs.io/docs/react-intl/)
-   [REACT-HOOK-FORM](https://react-hook-form.com/)
-   [REACT-ROUTER](https://reactrouter.com/)
-   [LODASH](https://lodash.com/)
-   [MOMENT](https://momentjs.com/)

## Estrutura das pastas:

-   **components:** Componentes que podem ser reutilizados na aplicação, exemplo: Tabela, Inputs, ToastMessages, Loading, Pagination...
-   **hooks:** Pasta para centralizar os hooks customizados do projeto.

-   **interfaces:** Pasta para salvar as interfaces que podem ser reaproveitadas em todo o projeto.

-   **intl:** Pasta que possui os resources para serem usados na internacionalização do projeto.

-   **models:** Pasta para salvar os models que podem ser reaproveitadas em todo o projeto.

-   **pages:** Pasta onde são criadas as paginas da aplicação. Cada pagina é responsavel por uma rota da aplicação e podem conter a implementação de um ou mais componentes. Em cada page possui uma pasta routes que possui as configurações da rota daquela pagina.

-   **providers:** Pasta onde ficam centralizados os contextos utilizados na aplicação. Sempre que precisar compartilhar informação entre as paginas utilizar um provider com a "API CONTEXT" do react. NÃO UTILIZAR REDUX PARA ESSA FINALIDADE.

-   **router:** Possui a configuração do guarda de rotas da aplicação, verifica a autenticação e permissão de acesso das rotas.

-   **service:** Possui a configuração base do axios para realizar as chamadas de api. Aqui são configurados as intercpetações de request e response da api.

-   **styles:** Estilização geral da aplicação. Aqui ficam as configurações das cores e podem ser aplicadas configurações de CSS para toda a aplicação.

-   **types:** Implementação para configurar os types utilizados na aplicação.

-   **utils:** Outros arquivos auxiliares para a aplicação. Aqui fica os arquivos responsaveis pela montagem das rotas e estruturação do menu.

#### NÃO UTILIZAR REDUX PARA COMPARTILHAR AS INFORMAÇÕES ENTRE AS PAGINAS. SEMPRE UTILIZAR API CONTEXT PARA ESSA FINALIDADE.

#

#

## Tech Versions

-   Versão do React: 17.0.2
-   Yarn: 1.22.10

Versão do Material-Ui:

-   @material-ui/core: ^4.12.3
-   @material-ui/icons: ^4.11.2
-   @material-ui/styles: ^4.11.4
-   @mui/icons-material: ^5.4.2
-   @mui/material: ^5.4.2
-   @mui/x-data-grid: ^5.5.1

#

#

## Instalação/Execução

##### Utilizar o [**YARN**](https://yarnpkg.com/) como gerenciador de pacotes do projeto.

#

#

Para instalar os pacotes:

```sh
yarn install
```

Para adicionar um pacote novo ao projeto:

```sh
yarn add name_package
```

Para executar o projeto em modo de desenvolvimento:

```sh
yarn start
```

Para gerar o build do projeto:

```sh
yarn build
```

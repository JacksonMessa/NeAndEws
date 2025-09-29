<h1>Visão Geral</h1>
O Ne&ews é um projeto front-end realizado com o intuito de aprimorar meus conhecimentos em Angular, TypeScript e SCSS. Trata-se de um site que consome a <a href="https://github.com/JacksonMessa/NewsAPI">NewsAPI</a> uma API que de notícias que eu desenvolvi utilizando tecnologias como Java, Spring, Spring Boot e PostgreSQL. Este projeto está disponível para teste em https://neandews.onrender.com.

<h2>Login</h2>
A tela de Login contém campos de username e senha que devem ser preenchidos para que o usuário possa entrar na sua conta e utilizar o site.

<img width="1919" height="893" src="https://github.com/user-attachments/assets/c39ee17e-9eb4-44d1-b22f-8c55e12aa616" />

<h2>Cadastro</h2>
Essa interface é semelhante à de login, porém ela serve para criar uma conta, nela o usuário deve inserir seu username e senha, além confirmar a senha que deseja inserir para evitar erros e escolher se será um leitor ou escritor.
<img width="1919" height="890" src="https://github.com/user-attachments/assets/8e931096-7ca3-4f71-a9f9-d4046d9a8936" />

<h2>Menu</h2>
Presente em todas as telas após realizar o login pelo menu é possível navegar pelas principais telas da aplicação e deslogar da sua conta.
<img width="1919" height="75" alt="image" src="https://github.com/user-attachments/assets/2f5b2beb-b14d-4989-a2f1-0b83140d1aa0" />

<h2>Home</h2>
Essa é a página principal em que o usuário pode ver uma prévia das notícias e escolher qual ele deseja ler, nela também é possível filtrar por escritor, título e data de publicação para facilitar encontrar a notícia e as notícias são divididas por páginas para melhorar a organização e evitar o carregamento de notícias desnecessárias.
<img width="1755" height="1271" alt="image" src="https://github.com/user-attachments/assets/1773bed4-508f-497b-ada4-0b77e6b14a00" />

<h2>Notícias em Detalhes</h2>
Ao clicar em <strong>"see more"</strong> ou no ícone de olho na página das notícias daquele escritor é possível ver as notícias completas, além de sua data de publicação e do seu escritor. Também, é possível nessa página, caso esteja na conta que a publicou, ir para a página de edição da notícia ou excluí-la.
<img width="1919" height="889" alt="Captura de tela 2025-08-13 142654" src="https://github.com/user-attachments/assets/73d3103b-e74a-4a7e-8939-f80f96b68d7b" />

<h2>Minhas Notícias</h2>
Essa tela só é acessível por usuários escritores e permite ver, alterar e excluir de forma mais fácil as notícias publicadas por aquela conta.
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/72ea2b31-baeb-4466-9ed8-889befd3e40e" />

<h2>Publicando e Editando Notícias</h2>
As interfaces para publicar e editar notícias são semelhantes as principais diferenças são alguns textos e o fato de na tela de edição os dados já virem preenchidos, através delas é possível inserir o título e corpo da notícia e realizar sua publicação ou atualização. Ambas são páginas exclusivas para escritores.
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/7a4bdd85-a75a-4d44-b25f-0bb5b39d0e17" />

<h1>Configurações</h1>
<ul>
  <li>Angular CLI 20.0.5</li>
  <li>Node: 24.2.0</li>
  <li>Typescript 5.8.3</li>
  <li>rxjs 7.8.2</li>
</ul>

<h1>Como utilizar</h1>

<ol>
  <li>Instalar e executar a NewsAPI: https://github.com/JacksonMessa/NewsAPI?tab=readme-ov-file#como-utilizar</li>
  <li>Baixar e instalar o Node.js: https://nodejs.org/pt/download
  <li>Instalar o Angular</li><br>
  
      npm install -g @angular/cli

  <li>Clonar o Projeto</li><br>
 
      git clone https://github.com/JacksonMessa/NeAndEws.git

  <li>Executar o projeto</li><br>

    cd NeAndEws
    npm install
    npm start

  <li>Utilize o navegador de sua preferência e acesse <a href="http://localhost:4200/">localhost:4200</a></li>
  
</ol>














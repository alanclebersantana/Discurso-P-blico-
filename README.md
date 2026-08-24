# Discursos Públicos · Oradores

App (PWA) para organizar discursos públicos, oradores e substitutos.
Tudo funciona offline, guardado no aparelho (localStorage). A sincronização
entre aparelhos por e-mail/senha é opcional, usando Firebase.

## Estrutura dos arquivos

```
index.html          → o app inteiro (HTML + CSS + JS)
manifest.json        → configuração do PWA (nome, cores, ícones)
sw.js                 → service worker (funcionamento offline)
firestore.rules       → regras de segurança do banco de dados (Firestore)
icons/                → ícones do app em vários tamanhos
```

## 1) Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público ou privado, mas
   o GitHub Pages gratuito exige repositório público).
2. Envie todos os arquivos desta pasta para a raiz do repositório
   (mantendo a pasta `icons/`).
3. No repositório: **Settings → Pages**.
4. Em "Build and deployment", escolha **Deploy from a branch**, selecione
   a branch `main` e a pasta `/ (root)`. Salve.
5. Em alguns minutos o GitHub mostra o link do site, algo como:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
6. Abra esse link no celular → menu do navegador → **"Adicionar à tela
   inicial" / "Instalar app"**. O app abrirá como um aplicativo comum,
   com ícone próprio e sem a barra do navegador.

> Importante: o PWA (service worker) só funciona em endereços com
> **https://** (o GitHub Pages já fornece isso automaticamente).

## 2) Configurar a sincronização com Firebase (opcional)

Sem isso, o app funciona normalmente, só que os dados ficam apenas
no aparelho onde foram digitados.

### 2.1 Criar o projeto

1. Acesse https://console.firebase.google.com e crie um projeto novo.
2. Dentro do projeto, clique no ícone **`</>`** (Web) para registrar um
   app da Web e copiar as chaves de configuração (`apiKey`, `authDomain`,
   `projectId`, `storageBucket`, `messagingSenderId`, `appId`).

### 2.2 Colar as chaves no index.html

Abra `index.html`, procure por `window.FIREBASE_CONFIG` (perto do fim do
arquivo, antes de `const Nuvem = {`) e substitua os textos
`"COLE_AQUI_..."` pelos valores copiados do Firebase. Exemplo:

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyD...........",
  authDomain: "discursos-abcde.firebaseapp.com",
  projectId: "discursos-abcde",
  storageBucket: "discursos-abcde.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

Suba o arquivo atualizado para o GitHub (ele substitui o antigo).

### 2.3 Ativar login por e-mail/senha

No Console do Firebase: **Authentication → Sign-in method → E-mail/senha
→ Ativar**.

### 2.4 Criar o Firestore e aplicar as regras de segurança

1. **Firestore Database → Criar banco de dados** (modo produção, escolha
   a região mais próxima, ex.: `southamerica-east1`).
2. Vá em **Regras** e cole o conteúdo do arquivo `firestore.rules`
   (já incluído nesta pasta). Clique em **Publicar**.

Essas regras garantem que **cada pessoa só enxerga e só edita os seus
próprios dados** — ninguém consegue ler ou alterar os dados de outra
conta, mesmo sabendo o link do app.

### 2.5 Usar

Dentro do app: **Ajustes → Sincronização → Criar conta** (com e-mail e
senha). Depois, em qualquer outro aparelho, basta **Entrar** com a
mesma conta para ver os mesmos discursos e temas.

## Ícone do app

O ícone usa a paleta de cores original do app: o orador em laranja e a
plateia em preto, gerado a partir da imagem enviada.

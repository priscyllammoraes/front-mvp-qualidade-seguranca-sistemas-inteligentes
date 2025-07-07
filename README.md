# Frontend - Predição de Obesidade

Este repositório contém a interface web desenvolvida para o MVP da disciplina **Qualidade, Segurança e Sistemas Inteligentes**. A aplicação permite a entrada de dados de um usuário e exibe o resultado da predição do grau de obesidade com base em um modelo de machine learning treinado previamente.

---

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (puro)**
- **Fetch API** para integração com o backend

---

## Funcionalidades

- Formulário interativo para preenchimento dos dados do usuário
- Integração com a API REST (`/predict` e `/pessoa`)
- Exibição clara e direta do resultado da predição
- Mensagens de erro e validação básica dos campos

---

## Executando Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/priscyllammoraes/front-mvp-qualidade-seguranca-sistemas-inteligentes
cd front-mvp-qualidade-seguranca-sistemas-inteligentes
```

### 2. Executar o servidor local

Use o Python (versão 3+) para servir os arquivos:

```bash
python -m http.server 8000
```

### 3. Acessar no navegador

Abra o navegador e acesse:

```
http://localhost:8000
```

> ⚠️ Certifique-se de que o backend (API) está rodando em `http://localhost:5000`, pois o frontend envia as requisições para esse endereço.

---

## Organização do Projeto

```
mvp-frontend/
├── index.html      # Página principal
├── style.css       # Estilos da interface
└── scripts.js      # Lógica de integração e interatividade
```

---

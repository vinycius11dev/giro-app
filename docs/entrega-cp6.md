# CP6 — Checklist de entrega final

## App funcional

- [x] Painel de estoque com prioridades calculadas automaticamente.
- [x] Cadastro, edição e exclusão de produtos.
- [x] Filtros de validade.
- [x] Ações de oferta, doação e descarte.
- [x] Histórico de ações.
- [x] Persistência local de dados.
- [x] Identidade visual consistente com o conceito do CP4.
- [x] Login, cadastro e logout com sessão local.
- [x] Apresentação institucional interativa acessível pelo login.

## Documentação

- [x] README com escopo, marca, modelo de negócio e instruções de execução.
- [x] Manual de uso.
- [x] Decisões técnicas.
- [x] Roteiro de testes e evidências esperadas.
- [x] Integrantes, RMs e divisão de responsabilidades preenchidos no README.
- [x] Prints das telas principais, login, cadastro e apresentação salvos em `docs/evidencias/` e vinculados no README.

## APK instalável

1. Instale o EAS CLI: `npm install -g eas-cli`.
2. Faça login com a conta Expo do grupo: `eas login`.
3. Execute `eas build --platform android --profile preview`.
4. Ao final do build, baixe o APK pelo link fornecido pelo EAS.
5. Instale o APK em um aparelho Android e grave um vídeo curto comprovando a abertura e a navegação.

> A etapa de login e o download do APK dependem da conta Expo do grupo; o projeto já contém `eas.json` com o perfil `preview` configurado para gerar APK.

## Evidências recomendadas

- Prints do dashboard, formulário, filtros, detalhe, histórico, conta, alertas, oportunidades, relatórios e impacto (já capturados em `docs/evidencias/`).
- Vídeo de uma oferta registrada aparecendo no histórico.
- Print ou vídeo do APK instalado em Android.

## Pendências externas antes do envio

- [ ] Executar o build com `eas build --platform android --profile preview` usando a conta Expo do grupo.
- [ ] Instalar o APK em um aparelho Android e registrar a abertura/navegação.
- [ ] Gravar um vídeo curto demonstrando o fluxo de cadastro, filtro e oferta/doação.

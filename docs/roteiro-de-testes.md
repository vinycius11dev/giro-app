# CP5 — Roteiro de testes do Giro

| ID    | Cenário                | Passos                                 | Resultado esperado                                    |
| ----- | ---------------------- | -------------------------------------- | ----------------------------------------------------- |
| CT-01 | Abrir aplicativo       | Iniciar pelo Expo                      | Painel e métricas aparecem sem erro.                  |
| CT-02 | Cadastrar produto      | Preencher os dados e salvar            | Item aparece com status correto.                      |
| CT-03 | Validar campos         | Tentar salvar sem nome ou quantidade   | Alerta é exibido; produto não é criado.               |
| CT-04 | Validar data           | Informar data fora de `AAAA-MM-DD`     | Aplicativo solicita correção.                         |
| CT-05 | Filtrar estoque        | Alternar os quatro filtros             | Lista mostra apenas itens correspondentes.            |
| CT-06 | Editar produto         | Abrir detalhe, editar e salvar         | Lista exibe dados atualizados.                        |
| CT-07 | Criar oferta           | Abrir item e escolher Criar oferta     | Item sai do estoque e entra no histórico.             |
| CT-08 | Registrar doação       | Abrir item e escolher Registrar doação | Item sai do estoque e entra no histórico.             |
| CT-09 | Excluir produto        | Abrir item e escolher Excluir          | Confirmação é exibida e item é removido após aceite.  |
| CT-10 | Persistência           | Cadastrar, fechar e reabrir o app      | Dados permanecem no dispositivo.                      |
| CT-11 | Buscar produto         | Pesquisar pelo nome ou categoria       | A lista mostra apenas resultados correspondentes.     |
| CT-12 | Editar estabelecimento | Alterar nome, negócio e cidade         | Conta e saudação exibem os novos dados.               |
| CT-13 | Configurar alertas     | Desligar, fechar e reabrir o app       | Preferência permanece desligada.                      |
| CT-14 | Abrir ajuda            | Tocar em Central de ajuda              | Modal apresenta o fluxo completo de uso.              |
| CT-15 | Restaurar demonstração | Confirmar a restauração na Conta       | Estoque, histórico e perfil voltam ao estado inicial. |
| CT-16 | Abrir alertas          | Tocar em Alertas na página inicial     | Prioridades aparecem conforme a validade.             |
| CT-17 | Abrir oportunidades    | Tocar em Oportunidades                 | Sugestões são coerentes com a urgência.               |
| CT-18 | Abrir relatórios       | Tocar em Relatórios                    | Indicadores refletem o estoque atual.                 |
| CT-19 | Abrir impacto          | Tocar em Impacto                       | Resultados refletem o histórico.                      |
| CT-20 | Acessar demonstração   | Na tela de login, tocar em Acessar demonstração | Painel é aberto com a conta demo.                     |
| CT-21 | Criar conta            | Preencher nome, e-mail e senha         | Conta é criada e o painel abre com o perfil informado. |
| CT-22 | Sair da conta          | Em Conta, tocar em Sair da conta       | Tela de login aparece novamente.                      |
| CT-23 | Sincronizar perfil     | Criar conta com outro nome e recarregar | Saudação e avatar exibem as iniciais da conta ativa.  |
| CT-24 | Abrir apresentação     | No login, tocar em Conheça a ideia do projeto | Apresentação abre com navegação por seções e CTA de demonstração. |
| CT-25 | Navegar no onboarding  | Na primeira abertura, avançar pelos cards ou tocar em Pular | Introdução apresenta a proposta e o painel fica disponível. |
| CT-26 | Abrir sobre o projeto  | Em Conta, tocar em Sobre o projeto | Modal apresenta tecnologias, ODS e proposta de valor. |
| CT-27 | Usar atalho de validade | No cadastro, tocar em 1, 3, 7 ou 30 dias | Campo de validade recebe a data correspondente. |
| CT-28 | Agendar alertas locais | Manter Alertas de validade habilitado no Android | Lembrete local é programado para produtos próximos do vencimento. |
| CT-29 | Ordenar produtos       | Em Produtos, selecionar Nome, Quantidade ou Categoria | Lista é reorganizada conforme o critério escolhido. |
| CT-30 | Ativar acessibilidade  | Em Conta, ativar Modo escuro ou Texto maior | Tema e tipografia são ajustados imediatamente e permanecem salvos. |
| CT-31 | Desfazer ação          | Registrar oferta, doação, descarte ou exclusão e tocar em Desfazer | Item retorna ao estoque e o histórico é revertido. |
| CT-32 | Explorar apresentação  | No login, navegar por Visão, Como funciona, Negócio e CP4 · CP5 · CP6 | Seções, imagens, métricas de impacto e comparação são exibidas com transições suaves. |
| CT-33 | Consultar CEP          | No cadastro, informar `01001-000` e tocar em Buscar endereço pelo CEP | Endereço e cidade/estado são preenchidos pela ViaCEP. |
| CT-34 | Tratar CEP inválido    | Informar um CEP incompleto ou inexistente | Mensagem orienta a correção e permite continuar preenchendo endereço manualmente. |
| CT-35 | Consultar planos       | Em Conta, tocar em Plano Giro e ativar o Pro | Limites do plano grátis, benefícios do Pro e ativação simulada são exibidos. |

## Evidências para a entrega

1. Vídeo curto navegando entre Início, Produtos e Histórico.
2. Vídeo demonstrando cadastro de produto, filtro, oferta/doação e histórico atualizado.
3. Vídeo ou registro textual das telas Alertas, Oportunidades, Relatórios e Impacto.
4. Vídeo do fluxo de Login, Cadastro e apresentação institucional.
5. Vídeo do onboarding e da tela Sobre o projeto.

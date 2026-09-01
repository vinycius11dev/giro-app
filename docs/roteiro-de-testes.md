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

## Evidências para a entrega

1. Print do painel inicial com os três indicadores.
2. Print do cadastro de produto.
3. Print da lista filtrada por urgência.
4. Print do detalhe e de uma ação de oferta/doação.
5. Print do histórico atualizado.
6. Vídeo curto navegando entre Início, Produtos e Histórico.
7. Print das telas Alertas, Oportunidades, Relatórios e Impacto.
8. Print das telas de Login e Cadastro.
9. Print da apresentação institucional com a proposta e o modelo de negócio.

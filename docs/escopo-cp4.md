# CP4 — Idealização do Giro

## Pitch

O Giro ajuda pequenos comércios de alimentos a agir antes que produtos vençam. Em vez de apenas listar datas, o aplicativo mostra prioridades e ajuda a escolher entre oferta, doação ou descarte registrado.

## Problema

O controle manual de validade faz com que itens próximos ao vencimento sejam percebidos tarde demais. O resultado são perdas financeiras e desperdício evitável.

## Público-alvo

Responsáveis por estoque de cafés, padarias, minimercados, hortifrutis e pequenos restaurantes que precisam de uma solução rápida e acessível pelo celular.

## Proposta de valor

Centralizar os produtos, destacar urgências automaticamente e converter cada alerta em uma ação prática de aproveitamento.

## Fluxo e telas

```text
Criar conta/entrar → adicionar produto → Giro calcula a prioridade → equipe escolhe uma ação → histórico registra o resultado
```

1. Início: visão de hoje, indicadores e produtos prioritários.
2. Login: entrada na conta local ou acesso de demonstração.
3. Cadastro: criação da conta e do estabelecimento.
4. Apresentação do projeto: proposta, fluxo, público, negócio, impacto e relação com os checkpoints.
5. Produtos: lista completa e filtros por urgência.
6. Cadastro de produto: nome, categoria, quantidade e validade.
7. Detalhe: sugestão e opções de oferta, doação ou descarte.
8. Histórico: ações concluídas.
9. Conta: perfil, configurações e logout do estabelecimento.
10. Alertas: itens que precisam de atenção imediata.
11. Oportunidades: sugestões de giro e desconto.
12. Relatórios: indicadores e categorias do estoque.
13. Impacto: resultados de ofertas, doações e descartes.

## Diferencial competitivo

Planilhas e sistemas de estoque tradicionais exigem configuração e não tornam a validade uma decisão simples. O Giro é leve, mobile e centrado em redução de desperdício: todo item perto do vencimento ganha uma recomendação de destino.

## Organização técnica

```text
app-mobile/
├── App.jsx                # Orquestração da aplicação em JSX
├── assets/                # Logo, ícone e recursos visuais do Giro
├── docs/                  # Escopo, QA e evidências
├── src/                   # Telas, componentes, hooks e serviços
├── app.json               # Configuração Expo e identidade do app
└── README.md              # Documento principal e manual de entrega
```

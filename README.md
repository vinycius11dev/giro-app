# Giro

> Menos desperdício, mais resultado.

O Giro é um aplicativo mobile para pequenos comércios de alimentos controlarem datas de validade e agirem antes que os produtos se percam. Ele destaca itens prioritários e permite registrar oferta, doação ou descarte.

## Projeto semestral — Mobile Development & IoT

| Checkpoint | Entrega contemplada                                                     |
| ---------- | ----------------------------------------------------------------------- |
| CP4        | Conceito, marca, escopo, setup React Native/Expo e modelo de negócio    |
| CP5        | Protótipo funcional, dados mockados, fluxo de telas e roteiro de testes |
| CP6        | App final, persistência local, manual de uso e preparação para APK      |

## Problema e proposta de valor

Pequenos cafés, padarias, mercados e hortifrutis frequentemente controlam validade em papel, planilhas ou pela memória. Isso causa desperdício de alimentos e perdas financeiras.

O Giro transforma uma simples data de validade em uma decisão prática: acompanhar, criar uma oferta, registrar uma doação ou registrar o descarte. Seu público são responsáveis pelo estoque de micro e pequenos comércios alimentícios.

## Funcionalidades

- Painel com itens em dia, em atenção e para agir hoje.
- Cadastro, edição e exclusão de produtos.
- Classificação automática por validade.
- Busca por nome/categoria e filtros de estoque por urgência.
- Registro de oferta, doação e descarte em histórico.
- Persistência local com AsyncStorage.
- Perfil do responsável e estabelecimento editável.
- Preferência de alertas persistente.
- Notificações locais para lembrar produtos que vencem nos próximos dias.
- Central de ajuda e restauração segura dos dados de demonstração.
- Onboarding animado na primeira abertura e acesso para rever a introdução.
- Atalhos de validade no cadastro e resumo visual de impacto no painel.
- Tela “Sobre o projeto” com tecnologias, ODS e proposta de valor.
- Modo escuro e opção de texto maior para melhorar acessibilidade.
- Ordenação do estoque por validade, nome, quantidade ou categoria.
- Feedback animado com desfazer para ações de estoque.
- Login, cadastro de conta e logout com sessão local persistente.
- Avatar e saudação sincronizados com o nome da conta ativa, inclusive após recarregar o app.
- Consulta de CEP pela API pública ViaCEP no cadastro e na edição do estabelecimento, com máscara, preenchimento automático e fallback manual.
- Apresentação institucional interativa acessível pelo login, com navegação por seções, imagens e modelo de negócio.
- Apresentação com seção de ODS, métricas de impacto, comparação com planilhas e galeria visual de produtos.
- Cálculo real da taxa de aproveitamento com base no histórico.
- Fotos realistas locais dos produtos, com fallback para emoji em categorias sem imagem.
- Tela de alertas com prioridades do estoque.
- Tela de oportunidades com sugestões de desconto.
- Relatórios com indicadores e distribuição por categoria.
- Tela de impacto com ofertas, doações, descartes e linha do tempo.

## Marca e identidade visual

- **Nome:** Giro
- **Tagline:** Menos desperdício, mais resultado.
- **Personalidade:** prática, otimista, humana e confiável.
- **Cor principal:** verde `#0D6A49`, associada a aproveitamento e impacto positivo.
- **Cor de ação:** laranja `#E76832`, indicando urgência sem agressividade.
- **Logotipo:** monograma “g” construído por um ciclo de renovação, com folha para representar alimentos e sustentabilidade e selo laranja para indicar um item conferido.
- **Arquivos da marca:** `assets/giro-logo.png` (fundo transparente) e `assets/giro-app-icon.png` (ícone oficial sobre fundo creme).

## Modelo de negócio e diferencial

O Giro utiliza um modelo **freemium**. A versão gratuita atende um estabelecimento; a versão Pro pode oferecer múltiplos usuários, relatórios de perdas, exportação de dados e notificações avançadas.

Ao contrário de uma planilha de validade, o Giro orienta um destino para cada item próximo ao vencimento. Isso ajuda o comerciante a recuperar valor ou gerar impacto social com doações.

## Tecnologias e decisões técnicas

- React Native + Expo, em JavaScript/JSX.
- AsyncStorage para persistência local sem necessidade de backend.
- expo-notifications para lembretes locais de validade no Android.
- expo-linear-gradient para o destaque visual do painel.
- @expo/vector-icons para ícones consistentes.
- ViaCEP para consulta de endereço a partir do CEP, sem armazenar dados fora do dispositivo.
- Hook `useInventory` como camada central das regras de negócio.
- Serviço de armazenamento isolado para facilitar manutenção e evolução.
- Navegação por estado local e abas customizadas para manter o MVP simples e leve.

## Estrutura de pastas

```text
app-mobile/
├── App.jsx                         # Orquestra telas e modais
├── assets/                         # Logo, ícone do app e recursos visuais
│   ├── giro-logo.png               # Marca com fundo transparente
│   ├── giro-app-icon.png           # Ícone quadrado para Android, iOS e web
│   └── products/                   # Fotos locais dos produtos do catálogo
├── src/
│   ├── screens/                    # Uma tela por arquivo JSX
│   │   ├── HomeScreen.jsx
│   │   ├── ProductsScreen.jsx
│   │   ├── HistoryScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   ├── AlertsScreen.jsx
│   │   ├── OpportunitiesScreen.jsx
│   │   ├── InsightsScreen.jsx
│   │   ├── ImpactScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── SignUpScreen.jsx
│   │   ├── OnboardingScreen.jsx
│   │   └── ProjectShowcaseScreen.jsx
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── BottomTabs.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FormField.jsx
│   │   ├── ModalHeader.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuickActionCard.jsx
│   │   ├── ScreenHeader.jsx
│   │   ├── SearchBar.jsx
│   │   └── SettingRow.jsx
│   ├── modals/                     # Formulários e detalhes em modal
│   │   ├── BusinessProfileModal.jsx
│   │   ├── AboutModal.jsx
│   │   ├── HelpModal.jsx
│   │   ├── ProductDetailModal.jsx
│   │   └── ProductFormModal.jsx
│   ├── hooks/useInventory.js       # Estado e regras de negócio
│   ├── hooks/useAuth.js            # Sessão e cadastro local
│   ├── services/storage.js         # Persistência com AsyncStorage
│   ├── services/notifications.js    # Lembretes locais de validade
│   ├── services/cep.js              # Consulta e máscara de CEP (ViaCEP)
│   ├── data/initialData.js         # Dados mockados iniciais
│   ├── styles/appStyles.js         # Identidade visual compartilhada
│   └── utils/productDates.js       # Datas, validade e prioridade
├── docs/
└── eas.json
```

## Executando

```bash
npm install
npm start
```

No Expo, pressione `w` para navegador ou `a` para emulador Android. Também é possível ler o QR Code com Expo Go em Android.

## Manual de uso

1. Na primeira abertura, avance pelo onboarding ou toque em **Pular**.
2. Abra o aplicativo e use **Acessar demonstração** ou toque em **Criar conta**.
3. Na tela de login, toque em **Conheça a ideia do projeto** para abrir a apresentação interativa.
4. Use a navegação **Visão**, **Como funciona**, **Negócio** e **CP4 · CP5 · CP6** para explorar a proposta.
5. Se criar uma conta, informe nome, e-mail e senha. O CEP é opcional: ao tocar em **Buscar endereço pelo CEP**, o Giro preenche endereço e cidade/estado automaticamente; se estiver sem internet, os campos continuam editáveis para preenchimento manual.
6. No painel, toque em **Adicionar produto** e informe nome, categoria, quantidade e validade (`AAAA-MM-DD`). Os atalhos de 1, 3, 7 e 30 dias agilizam o preenchimento.
7. Em **Produtos**, busque ou filtre por urgência e abra um item para ver a recomendação.
8. Registre uma oferta, doação ou descarte. A ação fica guardada no histórico.
9. Em **Conta**, edite o estabelecimento, configure os alertas locais, abra a ajuda, veja **Sobre o projeto** ou saia da conta.
10. Na página inicial, abra Alertas, Oportunidades, Relatórios ou Impacto.
11. A conta, sessão e dados do estoque permanecem salvos localmente no dispositivo.

## Testes e evidências

O roteiro manual de testes está em [docs/roteiro-de-testes.md](docs/roteiro-de-testes.md). Nesta seção reunimos as evidências dos principais fluxos executados na versão web do aplicativo.

## Evidências visuais

| Fluxo | Print |
| --- | --- |
| Login | <img src="docs/evidencias/12-login.png" width="220" alt="Tela de login" /> |
| Cadastro de conta | <img src="docs/evidencias/13-cadastro-conta.png" width="220" alt="Tela de cadastro de conta" /> |
| Apresentação do projeto | <img src="docs/evidencias/14-apresentacao-projeto.png" width="220" alt="Apresentação interativa do projeto" /> |
| Apresentação — modelo de negócio | <img src="docs/evidencias/15-apresentacao-negocio.png" width="220" alt="Seção de modelo de negócio da apresentação" /> |
| Apresentação — CP4, CP5 e CP6 | <img src="docs/evidencias/16-apresentacao-cp4-cp6.png" width="220" alt="Seção acadêmica da apresentação" /> |
| Onboarding | <img src="docs/evidencias/17-onboarding.png" width="220" alt="Onboarding inicial do Giro" /> |
| Sobre o projeto | <img src="docs/evidencias/18-sobre-projeto.png" width="220" alt="Tela sobre o projeto" /> |
| Painel inicial | <img src="docs/evidencias/01-dashboard.png" width="220" alt="Painel inicial do Giro" /> |
| Lista de produtos | <img src="docs/evidencias/02-produtos.png" width="220" alt="Lista de produtos" /> |
| Detalhe e ações do produto | <img src="docs/evidencias/03-detalhe-produto.png" width="220" alt="Detalhe do produto" /> |
| Histórico | <img src="docs/evidencias/04-historico.png" width="220" alt="Histórico de ações" /> |
| Conta e configurações | <img src="docs/evidencias/05-conta.png" width="220" alt="Tela de conta" /> |
| Alertas | <img src="docs/evidencias/06-alertas.png" width="220" alt="Tela de alertas" /> |
| Oportunidades | <img src="docs/evidencias/07-oportunidades.png" width="220" alt="Tela de oportunidades" /> |
| Relatórios | <img src="docs/evidencias/08-relatorios.png" width="220" alt="Tela de relatórios" /> |
| Impacto | <img src="docs/evidencias/09-impacto.png" width="220" alt="Tela de impacto" /> |
| Cadastro de produto | <img src="docs/evidencias/10-cadastro-produto.png" width="220" alt="Formulário de cadastro" /> |
| Filtro “Agir hoje” | <img src="docs/evidencias/11-filtro-urgencia.png" width="220" alt="Produtos filtrados por urgência" /> |

Os arquivos originais das evidências estão em [docs/evidencias](docs/evidencias). Como complemento da entrega do CP6, será anexado um vídeo curto de navegação e um print do APK instalado em um aparelho Android.

## Gerar APK (CP6)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

O último comando fornece, na conta Expo conectada, um link para baixar o APK instalável.

## Checklist da entrega

- [x] Aplicativo funcional em React Native/Expo com telas, modais e persistência local.
- [x] Login, cadastro, logout e sincronização do avatar com sessão local testados.
- [x] Consulta de CEP integrada no cadastro e no perfil, com tratamento de CEP inválido e fallback manual.
- [x] Identidade visual, logo, ícone e favicon configurados.
- [x] Roteiro de testes e 18 prints de evidência adicionados ao repositório.
- [x] Build web validado com `npx expo export --platform web`.
- [x] Expo Doctor aprovado com 21/21 verificações.
- [ ] Gerar o APK pelo EAS usando a conta Expo do grupo.
- [ ] Instalar o APK em Android e anexar print/vídeo da execução real.

## Integrantes e papéis

Esta foi a divisão de responsabilidades adotada pela equipe:

| Integrante | RM | Papel desempenhado |
| --- | --- | --- |
| Vinicius Henrique | RM556908 | Product Owner e documentação |
| Enzo Dias | RM558225 | Desenvolvimento React Native |
| Gustavo Pierre | RM558928 | Design e identidade visual |
| Gabriel Belo | RM551669 | QA e testes |
| Laura Souza | RM556320 | Dados, IoT e apresentação |

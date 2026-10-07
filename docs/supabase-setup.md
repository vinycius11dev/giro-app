# Configurando o Supabase (CP5)

O Giro funciona offline com AsyncStorage e sincroniza estoque, histórico e
perfil com o Postgres do Supabase quando as credenciais estão configuradas.
Sem as chaves, o aplicativo segue funcionando normalmente em modo local.

## 1. Criar o projeto

1. Acesse [supabase.com](https://supabase.com) e entre com GitHub ou e-mail.
2. Clique em **New project**, escolha a organização, defina nome (ex.: `giro`),
   senha do banco (guarde-a) e região `South America (São Paulo)`.
3. Aguarde o provisionamento (~2 minutos).

## 2. Criar as tabelas

1. No painel do projeto, abra **SQL Editor → New query**.
2. Cole o conteúdo completo de [`supabase/schema.sql`](../supabase/schema.sql).
3. Execute com **Run**. As tabelas `giro_products`, `giro_history` e
   `giro_state` aparecem em **Table Editor**.

## 3. Conectar o app

1. Em **Project Settings → API** (ou **Data API**), copie a **Project URL** e a
   chave **publishable** (`sb_publishable_...`). Se o painel exibir apenas a
   `anon` key legada (`eyJ...`), copie-a — o app aceita as duas.
2. Na raiz do projeto, copie `.env.example` para `.env.local` e preencha:

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
   ```

3. Reinicie o Expo (`npm start`) — variáveis `EXPO_PUBLIC_*` são lidas no
   bundle, então o servidor precisa ser reiniciado após criar o `.env.local`.

## 4. Verificar a integração

1. Entre no app com **Acessar demonstração** ou uma conta criada.
2. Cadastre um produto e abra **Table Editor → giro_products** no Supabase:
   a linha aparece com `owner_id` igual ao id da conta (`demo` na conta demo).
3. Registre uma oferta/doação e confira `giro_history`.
4. Edite o estabelecimento em **Conta** e veja `giro_state` atualizar.

## Como a sincronização funciona

- `src/services/supabase.js` cria o cliente a partir das variáveis de ambiente.
- `src/services/remoteStore.js` converte os objetos do app em linhas das tabelas
  e concentra todas as operações remotas (leitura inicial, upserts e deletes).
- `src/hooks/useInventory.js` recebe o `ownerId` da sessão ativa: ao entrar,
  carrega o estado remoto; a primeira sessão de cada conta envia os dados locais
  do aparelho como ponto de partida; cada mutação (cadastrar, editar, ofertar,
  doar, descartar, excluir, desfazer, restaurar demo) replica a alteração.
- AsyncStorage continua como cache local: sem internet ou sem `.env.local`,
  o app opera normalmente e exibe aviso de sincronização quando necessário.

## Segurança

- As chaves `publishable`/`anon` são públicas por design; a proteção real é o
  Row Level Security. O `schema.sql` ativa RLS com política permissiva porque
  a autenticação é local nesta versão acadêmica — a política de produção
  (`owner_id = auth.uid()`) está documentada no próprio arquivo.
- `.env.local` está no `.gitignore` e não é commitado.

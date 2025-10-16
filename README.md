# DDD (Domain Driven Design)

Design dirigido á domínio

## Domínio

- Domain Experts
    - Conversa
- Linguagem ubíqua

- Usuário
    - Cliente   
    - Fornecedor
    - Atendente
    - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso

## Conceitos

- Aggregate
- WatchedList

### Exemplo

- Order -> OrderItem[]
- Order -> Shipping

### Criação

- Título
- Conteúdo
- Anexos (3)

### Editar

- Título
- Conteúdo

- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)

## Aggregate

Aggregates ou Agregados, conjunto de objetos (entidades e value objects) que andam sempre juntos e que têm regras de consistência em comum. (são manipuladas ao mesmo tempo.)

Dentro de um aggregate sempre existe uma Aggregate Root, que é a "porta de entrada" para o resto.
Você só acessa e manipula os objetos do aggregate através dela.

Imagine um Pedido (Order), o pedido tem vários itens do pedido `ItemDoPedido`, você sempre mexe pelo Pedido (aggregate root).
Se você quiser adicionar um item, não cria o ItemDoPedido solto. Chama-se `pedido.adicionarItem(produto, quantidade)`
Dessa forma garantindo que:

- Não tem item duplicado.
- Quantidade mínima é 1.
- O valor total é recalculado certo.

O aggregate ajuda a manter a consistência e a regra de negócio em um lugar só.

## WatchedList

Ele serve quando você tem uma lista de entidades ou objetos dentro de um Aggregate e quer controlar mudanças (adições, remoções, atualizações) de forma rastreável. Ele “observa” a lista para saber o que mudou desde a última vez.
Isso é útil para mandar eventos ou atualizar o banco de dados de forma eficiente.

Continuando com o Pedido...
O Pedido tem a lista de ItensDoPedido.
Você usa um WatchedList para controlar a lista.


```ts
pedido.itens = WatchedList<ItemDoPedido>
```

Quando você chama

```ts
pedido.itens.add(itemX)
pedido.itens.remove(itemY)
```

O WatchedList sabe que:

itemX foi adicionado

itemY foi removido

Assim, quando for persistir no banco, você não precisa regravar a lista inteira — só aplica as mudanças.
E ainda pode disparar eventos:

"Item adicionado ao pedido"

"Item removido do pedido"

## Subdomínios

- Core: O que dá dinheiro
- Supporting: Dá suporte para o `core` funcionar
- Generic: Você precisa deles, mas não são tão importantes

### Exemplos e-commerce

#### Core

- Compra
- Catálogo
- Pagamento
- Entrega
- Faturamento

#### Supporting

- Estoque

#### Generic

- Notificação ao cliente
- Promoções
- Chat
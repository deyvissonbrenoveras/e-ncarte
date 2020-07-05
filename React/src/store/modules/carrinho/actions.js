export function addProdutoCarrinho(produto){
    return {type: "@carrinho/ADD", produto};
}

export function atualizarQuantidade(_id, quantidade){
    return {type: "@carrinho/ATUALIZAR_QUANTIDADE", _id, quantidade};
}

export function removerProdutoCarrinho(_id){
    return {type: "@carrinho/REMOVER", _id};
}
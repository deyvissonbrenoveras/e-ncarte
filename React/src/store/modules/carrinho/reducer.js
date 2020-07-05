import produce from "immer";
function carrinho(state = [], action){
    switch (action.type){
        case "@carrinho/ADD":
            return produce(state, draft => {
                const produtoIndex = draft.findIndex(p => p._id === action.produto._id);
                if (produtoIndex >= 0){
                    draft[produtoIndex].quantidade++;
                }
                else {
                    draft.push({
                        ...action.produto,
                        quantidade: 1
                    })
                }
            });
        case "@carrinho/ATUALIZAR_QUANTIDADE":
            if (action.quantidade <= 0){
                return state;
            }
            return produce(state, draft => {
                const produtoIndex = draft.findIndex(p => p._id === action._id);
                if (produtoIndex >= 0 ){
                    draft[produtoIndex].quantidade = Number(action.quantidade);
                }
            })    
        case "@carrinho/REMOVER":
            return produce(state, draft => {
                const produtoIndex = draft.findIndex(p => p._id === action._id);
                if (produtoIndex >= 0){
                    draft.splice(produtoIndex, 1);
                }
            });       
        default:
            return state;
    }
}
export default carrinho;
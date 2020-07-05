function loja(state = {}, action){
    switch(action.type){
        case "@loja/ADD":
            return action.loja;
        default:
            return state;    
    }
}
export default loja;
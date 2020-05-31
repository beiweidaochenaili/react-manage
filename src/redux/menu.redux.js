//统一管理action和reducer====reducer
import { type } from "./action"
const initialState = {
    menuName: '',
    
}
const reducer=(state=initialState,action)=>{
    // console.log(action)
    switch (action.type ) {
        
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName,
                father:action.father
            };
        default:
            return {...state};
    }
}
export default reducer
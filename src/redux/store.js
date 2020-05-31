import { createStore } from "redux"
import reducer from "./menu.redux"
const initialState = {
    menuName: ''
}
const  Store = () => createStore(reducer);
// console.log(Store)

export default Store;
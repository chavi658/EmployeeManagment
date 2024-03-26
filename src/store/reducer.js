import * as actionsName from './action';

const initializeState = {
    employee: null,
    employees: []
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionsName.SET_EMPLOYEE:
            {
                return {
                    ...state,
                    employee: action.employee

                }
            }
        case actionsName.ADD_EMPLOYEE:
            {
               
               
                return {
                    ...state,
                    employees :[...state.employees,action.data],
                

                }
            }
            case actionsName.SET_EMPLOYEE:
                {
                    const recipes = [...action.data]
                    return {
                        ...state,
                        recipes,
        
                    }
                }
                
             
            case actionsName.ADD_CATEGORY:
                {
                    const categories = [...state.categories]
                    categories.push(action.data)
                    return {
                        ...state,
                        categories,
    
                    }
                }
                            case actionsName.SET_CATEGORY:
                                {
                             
                                    return {
                                        ...state,
                                        category:action.data
                    
                                    }
                                }
                                case actionsName.SET_SHOPPING:
                                    {
                                        const shoppingList = [...action.data]
                                        return {
                                            ...state,
                                            shoppingList,
                            
                                        }
                                    }
                                    case actionsName.SET_SHOPPINGRECIPE:
                                        {
                                           
                                        }
                                    case actionsName.DELETE_RECIPE:
                                    {
                                        console.log("DELETE_RECIPE")
                                        const recipes2 = state.recipes?.filter(x => x.id != action.Recipe)
                                        return {
                                                                                    
                                         ...state, recipes2 
                        
                                        }
                                    }

        default:
            return { ...state }
    }
}
export default reducer;


export const INITIAL_STATE = [
    { title: "hehe", 
      image: "no.jpg", 
      list: ["list1"]  
    },
    { title: "haha", 
      image: "yes.jpg", 
      list: ["list1","list2"]  
    },
  ]

export const formReducer = (state, action) => {
    switch (action.type){
        case "CHANGE_TITLE":
            const newState  = {...state[action.payload.index], [action.payload.name]: action.payload.value }
            state[action.payload.index] = newState;
            return [
                ...state 
            ];
        case "UPLOAD_IMAGE":
            return {};
        case "ADD_LIST":
            return {};
        case "ADD_SECTION":
            return {};
        case "DELETE_IMAGE":
            return {};
        case "DELETE_SECTION":
            return {};
        case "DELETE_LIST":
            return {};
        default: 
            return state;
    }
}
export const INITIAL_STATE = [
    { title: "buku sejarah", 
      image: "", 
      list: ["list1", "list2"], 
      id: 1,  
    },
    { title: "buku tabungan", 
      image: "", 
      list: ["list1"], 
      id: 1,  
    }
  ]
  
export const formReducer = (state, action) => {
    const {name, value, indexSection, type, data } = action;
    const newData = [...state];
    const newSection = { ...newData[indexSection] };
    // console.log(indexSection)
    // console.log(data);
    
    switch (action.type){
        case "CHANGE_TITLE":
            newSection[name] = value;
            newData[indexSection] = newSection;
            return newData;

        case "UPLOAD_IMAGE":
            // state[action.payload.index] = action.payload.newState;
            return [
                ...state,
            ];
        case "ADD_LIST":
            return [];
        case "ADD_SECTION":
            return [ ...state, action.payload.value];
        case "DELETE_IMAGE":
            return {};
        case "DELETE_SECTION":
            return [ action.payload ];
        case "DELETE_LIST":
            return {};
        default: 
            return state;
    }
}

export const INITIAL_STATUS = {
    modalStatus: false,
}

export const formReducerStatus = (status, action) => {
    switch (action.type){
        case "CHANGE_STATUS_MODAL":
            return {
                ...status,
                modalStatus: !status.modalStatus
            };
        default: 
            return status;
    }
}


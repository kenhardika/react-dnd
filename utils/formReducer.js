export const INITIAL_STATE = [
    { title: "buku sejarah", 
      image: "", 
      list: ["list1", "list2"], 
    },
    { title: "buku tabungan", 
      image: "", 
      list: ["list1"], 
    }
  ]

export const formReducer = (state, action) => {
    const emptySection = { 
        title: "", 
        image: "", 
        list: [],
      }
    
    const {name, value, indexSection, indexList, payload } = action;
    const newData = [...state];
    const newSection = { ...newData[indexSection] };
    
    switch (action.type){
        case "CHANGE_TITLE":
            newSection[name] = value;
            newData[indexSection] = newSection;
            return newData;
        case "UPLOAD_IMAGE":
            newSection[name] = value;
            newData[indexSection] = newSection;
            return newData;
        case "ADD_LIST":
            const addNewList = [...newSection.list];
            addNewList.push(value);
            newSection.list = addNewList;
            newData[indexSection] = newSection;
            return newData;
        case "ADD_SECTION":
            return [ ...state, emptySection];
        case "DELETE_IMAGE":
            return ;
        case "DELETE_SECTION":
            newData.splice(indexSection, 1);
            return newData;
        case "DELETE_LIST":
            const newList = [...newSection.list ];
            newList.splice(indexList, 1);
            newSection.list = newList;
            newData[indexSection] = newSection;
            return newData;
        case "DRAG_AND_DROP":
            return payload;
        default: 
            return state;
    }
}

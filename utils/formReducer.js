export const INITIAL_STATE = [
    { title: "buku sejarah", 
      image: "", 
      list: ["list1", "list2"], 
    //   id: 1,  
    },
    { title: "buku tabungan", 
      image: "", 
      list: ["list1"], 
    //   id: 2,  
    }
  ]

// const randomizeID = () => {
//     const randomId = Math.floor(Math.random() * 20);
//     if (state.some((item) => (item.id === randomId))) {
//         return randomizeID();
//     } else {
//         return randomId;
//     }
// }

export const formReducer = (state, action) => {
//     const randomizeID = () => {
//         const randomId = Math.floor(Math.random() * 20);
//         if (state.some((item) => (item.id === randomId))) {
//             return randomizeID();
//         } else {
//             return randomId;
//         }
//     }
    
    const emptySection = { 
        title: "", 
        image: "", 
        list: [],
        // id: randomizeID()  
      }
    
    const {name, value, indexSection, indexList, type, data, id } = action;
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
            newSection[name] = value;
            newData[indexSection] = newSection;
            return newData;
        case "ADD_LIST":
            return [];
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
        default: 
            return state;
    }
}

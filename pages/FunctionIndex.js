import { useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputSection from "../components/InputSection";
import DeleteSection from "../components/InputSectionComponents/deleteSection";
import FormTitleSection from "../components/InputSectionComponents/FormTitleSection";
import ModalLayer from "../components/ModalLayer";
import { formReducer, INITIAL_STATE } from "../utils/formReducer";

export default function FunctionIndex() {

  const defaultState = { value:"", index:"" }

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [image, setImage] = useState(defaultState);
  const [showModal, setShowModal] = useState(false);

   const handleUpload = (e, index) => {
     e.preventDefault();
     let files;
     if (e.dataTransfer) {
       files = e.dataTransfer.files;
     } else if (e.target) {
       files = e.target.files;
     }
     const reader = new FileReader();
     reader.onload = () => {
       if (!reader.result) return;
       setImage({
         value: reader.result,
         index,
       });
     };
     if(reader.error) return
     reader.readAsDataURL(files[0]);
   };

  const handleDeleteImage = (indexSection) => {
    dispatch({
      type: "DELETE_IMAGE",
      indexSection
    })
  }
  
  const handleChange = (e, indexSection, data) => {
    dispatch({
      type: "CHANGE_TITLE",
      indexSection,
      name: e.target.name,
      value: e.target.value,
      data,
    });
  };

  const handleAddSection = () => {
    dispatch({ type: "ADD_SECTION" });
  };

  const handleDeleteSection = (indexSection) => {
    dispatch({
      type: "DELETE_SECTION",
      indexSection,
    });
  };

  const handleSubmitAddList = (value, indexSection) => {
    dispatch({
      type: "ADD_LIST",
      value,
      indexSection,
    });
  };

  const handleDeleteList = (indexSection, indexList) => {
    dispatch({
      type: "DELETE_LIST",
      indexSection,
      indexList,
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(state);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    dispatch({ type: "DRAG_AND_DROP", payload: items });
  };

  const handleChangeListOrder = (indexSection, payload) => {
    dispatch({ type: "DD_LIST", payload, indexSection });
  };
  console.log(state)
  return (
    <div className="h-screen bg-cyan-100">
      {showModal ? (
        <ModalLayer
          onHide={() => {
            setShowModal(false);
            setImage(defaultState);
          }}
          onCrop={(cropData) => {
            dispatch({
              type: "UPLOAD_IMAGE",
              name: "image",
              value: cropData,
              indexSection: image.index
            });
          }}
          image = {image.value}
        ></ModalLayer>
      ) : (
        ""
      )}
      <div
        className=" w-full bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100"
      >
        <div className="p-2 flex flex-col items-center gap-4">
          <p>hello, proceed to add section </p>
          <button
            className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5"
            onClick={() => handleAddSection()}
          >
            Add Section
          </button>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="section">
              {(provided) => (
                <div
                  className="h-full w-full flex flex-col p-5 gap-5 items-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state?.map((item, index) => {
                    return (
                      <Draggable
                        key={`key-${index}`}
                        draggableId={`id-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <InputSection
                              data={item}
                              handleUpload={(e) => handleUpload(e, index)}
                              
                              handleDeleteList={(indexList) =>
                                handleDeleteList(index, indexList)
                              }
                              handleSubmitAddList={(value) =>
                                handleSubmitAddList(value, index)
                              }
                              handleChangeListOrder={(payload) =>
                                handleChangeListOrder(index, payload)
                              }
                              showModal={() => {
                                setShowModal(true);
                              }}
                            >
                              <DeleteSection
                                handleDeleteSection={() =>
                                  handleDeleteSection(index)
                                }
                              />
                              <FormTitleSection
                                title={ item.title }
                                handleChange={(e) => handleChange(e, index, item)}
                              />

                            </InputSection>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

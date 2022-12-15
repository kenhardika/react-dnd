import { useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CropperLayer from "../components/CropperLayer";
import InputSection from "../components/InputSection";
import FormInputSection from "../components/InputSectionComponents/FormInputSection";
import ImageSection from "../components/InputSectionComponents/ImageSection";
import ListSection from "../components/InputSectionComponents/ListSection";
import ModalLayer from "../components/ModalLayer";
import { formReducer, INITIAL_STATE } from "../utils/formReducer";

export default function FunctionIndex() {

  const defaultImageState = { value:"", index:"" }
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [image, setImage] = useState(defaultImageState);
  const [showModal, setShowModal] = useState(false);

   const handleUpload = (e, index) => {
     e.preventDefault();
     let files;
     if (e.target) {
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
     if (reader.error || files[0] === undefined) return
     reader.readAsDataURL(files[0]);
   };

  const handleDeleteImage = (indexSection) => {
    dispatch({
      type: "DELETE_IMAGE",
      name: "image",
      value: "",
      indexSection,
    });
  }
  
  const handleChange = (e, indexSection) => { // todo create handle list, only change list
    dispatch({
      type: "CHANGE_TITLE",
      indexSection,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleChangeList = (e, indexList, indexSection) => {
    dispatch({
      type: "CHANGE_LIST",
      indexSection,
      indexList, 
      value: e.target.value
    })
  }

  const handleAddSection = () => {
    dispatch({ type: "ADD_SECTION" });
  };

  const handleDeleteSection = (indexSection) => {
    dispatch({
      type: "DELETE_SECTION",
      indexSection,
    });
  };

  const handleAddList = (indexSection) => {
    dispatch({
      type: "ADD_LIST",
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
  
  const handleUpdateListOrder = (indexSection, payload) => {
    dispatch({ type: "CHANGE_LIST_ORDER", payload, indexSection });
  };

  const handleOnDragEnd = (result) => {
    dispatch({ type: "DRAG_AND_DROP", payload: result });
  };

  return (
    <div className="h-screen bg-cyan-100">
      {showModal && (
        <ModalLayer
          onHide={() => {
            setShowModal(false);
            setImage(defaultImageState);
          }}
        >
          <CropperLayer
            onCrop={(cropData) => {
              dispatch({
                type: "UPLOAD_IMAGE",
                name: "image",
                value: cropData,
                indexSection: image.index,
              });
            }}
            onHide={() => {
              setShowModal(false);
              setImage(defaultImageState);
            }}
            image={image.value}
            handleUpload={(e) => 
              handleUpload(e, image.index)
            }
          />
        </ModalLayer>
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
                              deleteSection={() => handleDeleteSection(index)}
                            >
                              <FormInputSection
                                value={item.title}
                                name="title"
                                handleChange={(e) => handleChange(e, index)}
                              />
                              <ImageSection
                                image={item.image}
                                showModal={() => {
                                  setImage((c) => ({ ...c, index }));
                                  setShowModal(true);
                                }}
                                deleteImage={() => handleDeleteImage(index)}
                              />

                              <ListSection
                                dataList={item.list}
                                addList={() =>
                                  handleAddList(index)
                                }
                                updateListOrder={(payload) =>
                                  handleUpdateListOrder(index, payload)
                                }
                                deleteList={(indexList) =>
                                  handleDeleteList(index, indexList)
                                }
                                handleChange = { (e, indexList)=> handleChangeList(e, indexList, index ) }
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

import { useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputSection from "../components/InputSection";
import FormTitleSection from "../components/InputSectionComponents/FormTitleSection";
import ImageSection from "../components/InputSectionComponents/ImageSection";
import ListSection from "../components/InputSectionComponents/ListSection";
import ModalCropper from "../components/ModalCropper";
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
  
  const handleChange = (e, indexSection) => {
    dispatch({
      type: "CHANGE_TITLE",
      indexSection,
      name: e.target.name,
      value: e.target.value,
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
  
  const handleChangeListOrder = (indexSection, payload) => {
    dispatch({ type: "DD_LIST", payload, indexSection });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(state);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "DRAG_AND_DROP", payload: items });
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
          <ModalCropper
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
                              <FormTitleSection
                                title={item.title}
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
                                submitAddList={(value) =>
                                  handleSubmitAddList(value, index)
                                }
                                changeListOrder={(payload) =>
                                  handleChangeListOrder(index, payload)
                                }
                                deleteList={(indexList) =>
                                  handleDeleteList(index, indexList)
                                }
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

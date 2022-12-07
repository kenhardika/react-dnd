import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import InputSectionClass from '../components_class/inputSectionClass';
import FormTitleClass from '../components_class/InputSectionComponents/FormTitleClass';
import ImageClass from '../components_class/InputSectionComponents/ImageClass';
import ListClass from '../components_class/InputSectionComponents/ListClass';
import ModalCropperClass from '../components_class/ModalCropperClass';
import ModalLayerClass from '../components_class/ModalLayerClass';

class ClassIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          title: "",
          image: "",
          list: [],
        },
      ],
      showModal: false,
      image: {
        value: "",
        index: "",
      },
    };
  }

  handleUpdateSection = ({ data, getData }) => {
    this.setState((cur) => {
      const newData = data || getData(cur.sections);
      return {
        sections: [...newData],
      };
    });
  };

  handleChangeIndex = (data) => { 
    this.setState((cur) => {
      const newData = [...data];
      return {
        ...cur,
        sections: [
          ...newData
        ]
      }
    });
  }

  handleUpload = (e, index) => {
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
       this.setState({ image:{
         value: reader.result,
         index,
         }
       });
     };
     if (reader.error || files[0] === undefined) return
     reader.readAsDataURL(files[0]);
   };
  handleOnDragEnd = (result, state, updateSection ) => {
    if (!result.destination) return;
    const items = Array.from(state);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateSection(items);
  };

  handleUpdateState = ({ data, getData }) => {
    this.setState((cur) => {
      const newData = data || getData(cur);
      return {
        ...newData,
      };
    });
  };

  changeModalStatus = (value) => {
    this.setState({ showModal: value });
  };
  changeImageIndex = (index) => {
    this.setState((cur) => ({ ...cur, image: { ...cur.image, index } }));
  };

  render() {
    console.log(this.state);
    const emptyData = {
      title: "",
      image: "",
      list: [],
    };
    const { sections, showModal, image } = this.state;
    return (
      <>
        {showModal && (
          <ModalLayerClass onHide={() => this.changeModalStatus(!showModal)}>
            <ModalCropperClass
              onCrop={(onCropData) =>
                this.handleUpdateSection({
                  getData(section, index = image.index) {
                    const newData = [...section];
                    newData[index].image = onCropData;
                    return newData;
                  },
                })
              }
              image={image.value}
              handleUpload={(e) => this.handleUpload(e, image.index)}
              onHide={() => this.changeModalStatus(!showModal)}
            />
          </ModalLayerClass>
        )}
        <div
          className=" w-full h-[900px] bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100"
        >
          <div className="p-2 flex flex-col items-center gap-4">
            <p>hello, proceed to add section </p>
            <button
              className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5"
              onClick={() =>
                this.handleUpdateSection({
                  data: [...sections, emptyData],
                })
              }
            >
              Add Section
            </button>

            <div // draggable
            >
              <DragDropContext
                onDragEnd={(res) =>
                  this.handleOnDragEnd(
                    res,
                    sections,
                    this.handleChangeIndex()
                  )
                }
              >
                <Droppable droppableId="list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {sections &&
                        sections.map((section, index) => (
                          <Draggable
                            key={`key-list-${index}`}
                            draggableId={`list-id-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="py-1 border border-solid"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <InputSectionClass
                                  key={index}
                                  deleteSection={() =>
                                    this.handleUpdateSection({
                                      getData(section) {
                                        const newData = [...section];
                                        newData.splice(index, 1);
                                        return newData;
                                      },
                                    })
                                  }
                                >
                                  <FormTitleClass
                                    handleChange={(e) =>
                                      this.handleUpdateSection({
                                        getData(section) {
                                          const newData = [...section];
                                          newData[index][e.target.name] =
                                            e.target.value;
                                          return newData;
                                        },
                                      })
                                    }
                                    title={section.title}
                                  />

                                  <ImageClass
                                    image={section.image}
                                    handleUpdateState={() =>
                                      this.handleUpdateState({
                                        getData(state) {
                                          const newData = { ...state };
                                          newData.image.value = "";
                                          newData.image.index = index;
                                          newData.showModal = !state.showModal;
                                          return newData;
                                        },
                                      })
                                    }
                                    deleteImage={() =>
                                      console.log("delete" + " " + index)
                                    }
                                  />

                                  <ListClass
                                    dataList={section.list}
                                    changeListOrder={(data) =>
                                      this.handleUpdateSection({
                                        getData(section) {
                                          const newData = [...section];
                                          newData[index].list = data;
                                          return newData;
                                        },
                                      })
                                    }
                                    deleteList={(indexList) =>
                                      this.handleUpdateSection({
                                        getData(section) {
                                          const newData = [...section];
                                          const newList = [...section[index].list];
                                          newList.splice(indexList, 1);
                                          newData[index].list = newList;
                                          return newData;
                                        },
                                      })
                                    }
                                    submitAddList={(data) =>
                                      this.handleUpdateSection({
                                        getData(section) {
                                          const newData = [...section];
                                          const newList = [...section[index].list];
                                          newList.push(data);
                                          newData[index].list = newList;
                                          return newData;
                                        },
                                      })
                                    }
                                  // changeListOrder =
                                  />
                                </InputSectionClass>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ClassIndex;
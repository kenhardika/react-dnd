import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import CropperLayerClass from '../components_class/CropperLayerClass';
import InputSectionClass from '../components_class/inputSectionClass';
import FormTitleClass from '../components_class/InputSectionComponents/FormTitleClass';
import ImageClass from '../components_class/InputSectionComponents/ImageClass';
import ListClass from '../components_class/InputSectionComponents/ListClass';
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

  handleUpdateState = ({ data, getData }) => {
    this.setState((cur) => {
      const newData = data || getData(cur);
      return {
        ...newData,
      };
    });
  };
  
  handleUpload = (e, index) => {
    e.preventDefault();
    let files;
   if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      this.setState({
        image: {
          value: reader.result,
          index,
        },
      });
    };
    if (reader.error || files[0] === undefined) return;
    reader.readAsDataURL(files[0]);
  };
  handleOnDragEnd = (result, state) => {
    if (!result.destination) return;
    const items = Array.from(state);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ sections: items });
  };


  render() {
    const emptyData = {
      title: "",
      image: "",
      list: [],
    };
    const { sections, showModal, image } = this.state;
    return (
      <>
        {showModal && (
          <ModalLayerClass
            onHide={() =>
              this.handleUpdateState({
                data: { ...this.state, showModal: !showModal },
              })
            }
          >
            <CropperLayerClass
              onCrop={(onCropData) => this.handleUpdateState({
                getData(state, index = image.index) {
                  const newData = { ...state };
                  newData.sections[index].image = onCropData;
                  return newData;
              }}) }
              image={image.value}
              handleUpload={(e) => this.handleUpload(e, image.index)}
              onHide={() =>
                this.handleUpdateState({
                  data: { ...this.state, showModal: !showModal },
                })
              }
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
              onClick={()=> this.handleUpdateState({ data: { sections:[ ...sections, emptyData ] } })}
            >
              Add Section
            </button>

            <div 
            >
              <DragDropContext
                onDragEnd={(res) => this.handleOnDragEnd(res, sections)}
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
                                    this.handleUpdateState({
                                      getData(state) {
                                        const newData = { ...state };
                                        newData.sections.splice(index, 1);
                                        return newData;
                                    }})
                                  }
                                >
                                  <FormTitleClass
                                    handleChange={(e) => this.handleUpdateState({
                                      getData(state) {
                                        const newData = { ...state };
                                        newData.sections[index][e.target.name] = e.target.value;
                                        return newData
                                      }
                                    })}  

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
                                      this.handleUpdateState({
                                        getData(state) {
                                          const newData = { ...state };
                                          newData.sections[index].image = ""
                                          return newData;
                                        },
                                      })
                                    }
                                  />

                                  <ListClass
                                    dataList={section.list}
                                    changeListOrder={(data) =>
                                      this.handleUpdateState({
                                        getData(state) {
                                          const newData = { ...state };
                                          newData.sections[index].list = data;
                                          return newData;
                                        },
                                      })
                                    }
                                    
                                    deleteList={(indexList) => this.handleUpdateState({
                                      getData(state) {
                                        const newData = { ...state };
                                        newData.sections[index].list.splice(indexList, 1);
                                        return newData;
                                    }}) }

                                    submitAddList={(data) => this.handleUpdateState({
                                      getData(state) {
                                        const newData = { ...state };
                                        newData.sections[index].list.push(data);
                                        return newData;
                                    }})}
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
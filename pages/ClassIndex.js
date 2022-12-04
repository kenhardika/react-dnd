import React, { Component } from 'react';
import InputSectionClass from '../components_class/inputSectionClass';
import FormTitleClass from '../components_class/InputSectionComponents/FormTitleClass';
import ImageClass from '../components_class/InputSectionComponents/ImageClass';
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

  // getData(currentSection) {
  //   const newData = currentSection.filter((sec)=>sec)
  //   return newData;
  // }

  handleDeleteSection = () => {
    console.log("deleted")  
  };

  handleAddSection = () => { 
    
  }

  handleUpdateSection = ({data, getData}) => { 
    this.setState((cur) => {
      const newData = data || getData(cur.sections)
      return {
        sections: [
          ...newData
      ]
      }
    });
  }
  // handleOnDragEnd = (result) => {
  //   if (!result.destination) return;
  //   const items = Array.from(state);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  // this.setState({ type: "DRAG_AND_DROP", payload: items });
  // };

  render() {
    console.log(this.state);
    const emptyData =
        {
          title: "",
          image: "",
          list: [],
    }
    const { sections, showModal, image } = this.state;
  //   const initialData = [{ title: "buku sejarah", image: "", list: ["list1", "list2"] },
  // { title: "buku tabungan", image: "", list: ["list1"] }]
    return (
      <>
        {
          showModal &&(
            <ModalLayerClass
              onHide={() => this.setState({ showModal: !showModal })}
              
          ></ModalLayerClass>)
        }
        <div
          className=" w-full h-[900px] bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100"
        >
          <div className="p-2 flex flex-col items-center gap-4">
            <p>hello, proceed to add section </p>
            <button
              className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5"
              onClick={() => this.handleUpdateSection({ data: [ ...this.state.sections, emptyData] })}
            >
              Add Section
            </button>

            <div // draggable
            >
              {sections &&
                sections.map((section, index) => 
                  <InputSectionClass key={index}
                    deleteSection={() => this.handleUpdateSection({
                      getData(section) {
                        const newData = [...section];
                        newData.splice(index, 1);
                        return newData;
                     } })}
                  >
                    <FormTitleClass
                      handleChange={(e) => this.handleUpdateSection({
                        getData(section) { 
                          const newData = [...section];
                          newData[index][e.target.name] = e.target.value;
                          return newData;
                      } })}
                      title = {section.title}
                    />

                    <ImageClass
                      image = {image.value}
                      showModal={()=> this.setState({ showModal: !showModal })}
                      deleteImage = {()=>console.log("delete"+" "+ index)}
                    >
                      
                    </ImageClass>

                  </InputSectionClass>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ClassIndex;
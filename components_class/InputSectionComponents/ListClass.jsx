import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import InputListClass from './InputListClass';

class ListClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
  }
  handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dataList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // this.props.changeListOrder(items);
  };

  changeShowInput = (value) => { 
    this.setState({showInput: value})
  }

  render() {
    const { dataList, deleteList, submitAddList, changeListOrder } = this.props;
    const { showInput } = this.state;
    return (
      <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                className="w-full h-full gap-2 bg-gray-300"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dataList?.map((list, index) => {
                  return (
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
                          <InputListClass
                            key={index}
                            lists={list}
                            deleteList={() => deleteList(index)}
                          />
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
        {showInput && (
          <form
            className="flex flex-col justify-center items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitAddList(e.target[0].value);
              this.changeShowInput(!showInput);
            }}
          >
            <input type="text" name="list" />
            <button
              type="submit"
              className="bg-blue-500 w-[80px] rounded-lg text-white "
            >
              ok
            </button>
          </form>
        )}
        <button
          type="button"
          className=" w-[50px] bg-gray-500 text-white rounded-lg text-sm"
          onClick={() => {
            this.changeShowInput(!showInput);
          }}
        >
          + list
        </button>
      </div>
    );
  }
}

export default ListClass;
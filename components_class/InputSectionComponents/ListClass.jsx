import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FormInputClass from './FormInputClass';

class ListClass extends PureComponent {
  
  handleOnDragEnd = (result, dataList, changeListOrder) => {
    if (!result.destination) return;
    const items = Array.from(dataList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    changeListOrder(items);
  };


  render() {
    const {
      dataList,
      handleChange,
      submitAddList,
      changeListOrder,
    } = this.props;
    return (
      <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
        <DragDropContext onDragEnd={(res) => this.handleOnDragEnd(res, dataList, changeListOrder)}>
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
                          <FormInputClass
                            value={list}
                            name="list"
                            handleChange={(e) => handleChange(e, index)}
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
          <form
            className="flex flex-col justify-center items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitAddList(e.target[0].value);
            }}
          >
            <button
              type="submit"
              className="bg-blue-500 w-[80px] rounded-lg text-white "
            >
              Add List
            </button>
          </form>
      </div>
    );
  }
}

export default ListClass;
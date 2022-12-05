import React, { memo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import InputList from './InputList';

function ListSection({ dataList, deleteList, submitAddList, changeListOrder }) {
  const [showInput, setShowInput] = useState(false);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dataList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    changeListOrder(items);
  };

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
                        <InputList
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
            setShowInput(false);
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
          setShowInput(!showInput);
        }}
      >
        + list
      </button>
    </div>
  );
}
function areNonFuncPropsEquals(prevProps, nextProps) {
  return prevProps.dataList === nextProps.dataList;
}

export default memo(ListSection, areNonFuncPropsEquals);

import { memo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputList from "./InputList";

function InputSection({
  data,
  handleSubmitAddList,
  handleChangeListOrder,
  handleDeleteList,
  children,
  handleDeleteSection,
}) {
  const tagRef = useRef();
  const [showInput, setShowInput] = useState(false);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data.list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleChangeListOrder(items);
  };
  return (
    <>
      <div
        className="w-[500px] h-auto flex flex-col p-5 
            bg-white rounded-lg gap-5"
      >
        <div className="flex justify-end">
          <button
            className="px-2 bg-red-500 
                    text-white text-sm rounded-xl"
            onClick={handleDeleteSection}
          >
            delete
          </button>
        </div>
        {children}

        <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className="w-full h-full gap-2 bg-gray-300"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data?.list?.map((lists, index) => {
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
                              lists={lists}
                              handleDeleteList={() => handleDeleteList(index)}
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
          {showInput ? (
            <form
              ref={tagRef}
              className="flex flex-col justify-center items-center gap-2"
            >
              <input type="text" name="list" defaultValue={"input list"} />
              <button
                className="bg-blue-500 w-[80px] rounded-lg text-white "
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmitAddList(tagRef.current[0].value);
                  setShowInput(false);
                }}
              >
                {" "}
                ok{" "}
              </button>
            </form>
          ) : (
            ""
          )}
          <button
            className=" w-[50px] bg-gray-500 text-white rounded-lg text-sm"
            onClick={() => {
              setShowInput(!showInput);
            }}
          >
            + list
          </button>
        </div>
      </div>
    </>
  );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
  return prevProps.data === nextProps.data;
}

export default memo(InputSection, areNonFuncPropsEquals);

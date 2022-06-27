import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
const NotePade = () => {
  const getLocalData = () => {
    const lists = localStorage.getItem("Mynotes");

    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  const [inputdata, setInputData] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [isEditItem, setIsEditItem] = useState("");
  const [items, setItems] = useState(getLocalData());
  const itemsRevers = [...items].reverse();
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (isEditItem) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
      window.reload();
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
      setToggleButton(false);
      window.reload();
    }
  };
  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
    setToggleButton(false);
    setInputData("");
  };

  useEffect(() => {
    localStorage.setItem("Mynotes", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Notes</h1>
          <button className="addNotes" onClick={() => setToggleButton(true)}>
            <GrAdd />
          </button>
        </div>

        {itemsRevers.map((curEle) => {
          return (
            <div className="notes" key={curEle.id}>
              <span onClick={() => editItem(curEle.id)} className="notesDis">
                {curEle.name.substring(0, 25)}...
              </span>
              <RiDeleteBin2Line
                onClick={() => deleteItem(curEle.id)}
                className="deleteButton"
              />
            </div>
          );
        })}
      </div>
      {toggleButton ? (
        <>
          <div className="separator"></div>
          <div className="textareaContainer  ">
            <textarea
              className="notesTextarea"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
              placeholder="Take a notes"
            ></textarea>
            <div className="inputNotesFooter">
              <input
                type="button"
                value="Save"
                onClick={addItem}
                className="saveButton"
              />
              <button
                className="closeNotes"
                onClick={() => setToggleButton(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NotePade;

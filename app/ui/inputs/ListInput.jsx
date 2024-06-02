'use client'


import { MdDeleteForever } from "react-icons/md";
import React, { useState, useEffect } from "react";

function ListInput({ className, label, name, setFieldValue, id }) {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleAdd = (event) => {
    if (list.length < 3) {
      event.preventDefault();
      if (!text.trim()) return;

      setList((prevList) => [...prevList, text]);
      setText("");
    }
  };

  useEffect(() => {
    if (typeof setFieldValue === 'function') {
      setFieldValue(id, list);
    }
  }, [list]);

  const handleDelete = (indexToRemove) => {
    const newList = list.filter((_, index) => index !== indexToRemove);
    setList(newList);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500 ">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          name={name}
          type="text"
          value={text}
          className={`${className} w-full rounded border-2 border-gray-300 bg-transparent px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:border-primary focus:placeholder-opacity-100 focus:ring-2`}
          onChange={handleChange}
        />
        <button
          onClick={handleAdd}
          className="rounded bg-primary px-6 text-white"
        >
          ADD
        </button>
      </div>
      <div className="w-120 flex flex-wrap">
        {list.map((item, index) => (
          <div
            key={index}
            className=" m-0.5 flex rounded-xl border border-gray-300 p-1"
          >
            <p className="border-r-2 pr-1">{item}</p>
            <button onClick={() => handleDelete(index)}>
              <MdDeleteForever className="size-5 fill-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListInput;

const TextAreaField = ({ label, name, id, className, cols, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500 ">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        {...props}
        className={`${className} border-gray-300bg-transparent height-5 w-full  resize-none rounded  border-2 px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:border-primary focus:placeholder-opacity-100 focus:ring-2`}
        rows="3"
        cols={cols}
      />
    </div>
  );
};

export default TextAreaField;

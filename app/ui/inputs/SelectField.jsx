
function SelectField({ label, options, className, id, name, ...props }) {
  return (
    <div >
      <label
        className='block mb-2 text-sm font-medium text-gray-500'
      >
        {label}
      </label>
      <select
       name={name}
       id={id}
       {...props}
        className={`${className} w-full rounded border-2 border-gray-300 bg-transparent px-4 py-2 leading-6 outline-none transition-all duration-200 ease-linear focus:border-2 focus:border-primary focus:placeholder-opacity-100 focus:ring-2`}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;

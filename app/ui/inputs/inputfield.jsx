

const  InputField = ({ label, type, name,className, id, ...props }) => {
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-500 "
      >
       {label}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        className= {`${className}border-gray-300 bg-transparent w-full rounded border-2 px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:border-primary focus:placeholder-opacity-100 focus:ring-2`}
        {...props}
      />
      
    </div>
  );
}

export default InputField
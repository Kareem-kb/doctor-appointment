import { IoMdSearch } from "react-icons/io";

export default function SearchBar() {
  const specialization = [
    "Choose",
    "General Practitioner",
    "Dentistry",
    "Gynecology",
    "Orthopedics",
    "Cardiology",
    "Psychiatry",
    "Pediatrics",
    "Ophthalmology",
    "Neurology",
    "Dermatology",
    "Anesthesiology",
  ];

  return (
    <form className="mx-auto max-w-lg">
      <div className="flex">
        <select
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-2 py-2.5 text-center text-sm font-medium "
          type="button"
        >
          {specialization.map((specialize) => {
            return <option> {specialize}</option>;
          })}
        </select>
        <div class="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            class="z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500"
            placeholder="Search for a Doctor.."
          />
          <button
            type="submit"
            class="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <IoMdSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { PiWarningCircleBold } from "react-icons/pi";

export default function Example() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-sky-100">
        <Image
          className=" cursor-pointer p-1"
          src={logo}
          height={100}
          width={100}
          priority={true}
          alt="Test Logo"
        />
      </header>

      {/* Main Content */}
      <main className="flex flex-grow">
        {/* Section 1 */}
        <section
          className="group relative flex w-1/2 items-center bg-cover bg-center p-8 transition-all duration-300 ease-in-out hover:w-10/12"
          style={{ backgroundImage: `url('/images/PatientCover.png')` }}
        >
          <div className="absolute inset-0 bg-black opacity-5 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
          <div className="relative max-w-sm text-white">
            <h2 className="mb-4 text-2xl font-bold">Patient</h2>
            <p className="max-w-sm text-white">
              Welcome to our portal where you can book doctor appointments at
              different hospitals. Manage your healthcare with ease by
              registering or logging in. Our portal allows you to access medical
              records and, schedule visits, Login or Register today to take
              control of your health.
            </p>
            <div className="mt-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Link href="/login">
                <button className="mr-2 rounded-md bg-primary p-2 text-xs text-white">
                  Login
                </button>
              </Link>
              <span className="text-white">or</span>
              <Link
                href="/register"
                className="ml-2 text-xs text-white hover:text-primary"
              >
                Register
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section
          className="group relative flex w-1/2 items-center bg-cover bg-center p-8 transition-all duration-300 ease-in-out hover:w-10/12"
          style={{ backgroundImage: `url('/images/DoctorCover.png')` }}
        >
          <div className="absolute inset-0 bg-black opacity-5 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
          <div className="relative max-w-sm text-white">
            <h2 className="mb-4 text-2xl font-bold">Doctor</h2>
            <p className="max-w-sm text-white">
              Join our portal to enhance your practice. Check upcoming patient
              appointments, review reasons for visits, and access previous visit
              records for a comprehensive understanding of your patients'
              health. If you're not register let your hospital, contact us.
            </p>
            <div className="mt-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Link href="/login">
                <button className="mr-2 rounded-md bg-primary p-2 text-xs text-white">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section
          className="group relative flex w-1/2 items-center bg-cover bg-center p-8 transition-all duration-300 ease-in-out hover:w-10/12"
          style={{ backgroundImage: `url('/images/HospitalCover.png')` }}
        >
          <div className="absolute inset-0 bg-black opacity-5 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
          <div className="relative max-w-sm text-white">
            <h2 className="mb-4 text-2xl font-bold">Hospital</h2>
            <p className="max-w-sm text-white">
              Efficiently manage your doctors with our platform. Register your
              hospital by emailing us at email@test.com and gain access to our
              comprehensive management tools. Add as many doctors as needed to
              streamline your healthcare services and improve patient care.
            </p>
            <div className="mt-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Link rel="preload" href="/login">
                <button className="mr-2 rounded-md bg-primary p-2 text-xs text-white">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-9 overflow-hidden bg-sky-100 p-2 text-center text-black transition-all duration-300 ease-in-out hover:h-48">
        <div className="flex flex-col items-center text-red-500">
          <div className="flex">
            {" "}
            <PiWarningCircleBold className="mb-2 text-xl" />
            <h4 className="font-bold">Disclaimer</h4>
          </div>
          <p className="max-w-lg text-xs">
            This website is a mock-up created for a bachelor's graduation
            project. To test all functionalities and features, feel free to use
            the existing accounts based on the specified roles.
          </p>
        </div>
        <div className="mt-4">
          <ul className="flex justify-around px-5 text-xs">
            <li>
              <div className="text-left">
                <h5 className="font-semibold">Patient</h5>
                <p>
                  <strong>Email:</strong> kareem@g.com
                </p>
                <p>
                  <strong>Password: </strong>123456
                </p>
              </div>
            </li>
            <li>
              <div className="text-left">
                <h5 className="font-semibold">Doctor</h5>
                <p>
                  <strong>Email:</strong> k@gm.com
                </p>
                <p>
                  <strong>Password: </strong>123456
                </p>
              </div>
            </li>
            <li>
              <div className="text-left">
                <h5 className="font-semibold"> Hospital</h5>
                <p>
                  <strong>Email:</strong> hospital@example.com
                </p>
                <p>
                  <strong>Password: </strong>TestPassword123
                </p>
              </div>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

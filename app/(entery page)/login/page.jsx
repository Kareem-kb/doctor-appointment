"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import InputField from "@/app/ui/inputs/inputfield";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("Redirecting to dashboard...");
      router.push("/patient/dashboard");
    }
  }, [session, router]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {

      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        console.log("signIn response:", res); // Log response from signIn

        if (!res.error) {
          router.push("/patient/dashboard");
        } else {
          console.error("Login failed:", res.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="rounded-lg bg-white shadow sm:max-w-2xl xl:p-0">
        <div className="items-center pl-8">
          <Image
            src={logo}
            width={200}
            height="auto"
            priority
            alt="test logo"
          />
        </div>
        <form onSubmit={formik.handleSubmit} className="px-4 py-4">
          <InputField
            id="email"
            type="email"
            name="email"
            label="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="ml-2 text-xs text-red-500">{formik.errors.email}</p>
          )}
          <InputField
            id="password"
            type="password"
            name="password"
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="ml-2 text-xs text-red-500">
              {formik.errors.password}
            </p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 w-40 place-self-center rounded-md bg-primary p-2 text-lg text-white"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            <p className="ml-2 text-xs text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="hover:text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

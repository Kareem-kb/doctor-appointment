"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsSubmitting(true);
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (!res.error) {
          router.push("/patient/dashboard");
        } else {
          setIsSubmitting(false);
          if (res.error === "User not found") {
            setErrors({ email: "Email not found", password: "" });
          } else if (res.error === "Incorrect password") {
            setErrors({ email: "", password: "Incorrect password" });
          } else {
            setErrors({ email: "Login failed", password: "Login failed" });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
        setIsSubmitting(false);
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
          <div className="flex justify-center ">
            <button
              type="submit"
              className={`mt-4 flex items-center justify-center place-self-center rounded-md bg-primary p-2 text-lg text-white transition-all duration-300 ease-in-out ${
                isSubmitting ? "w-36" : "w-28"
              }`}
              disabled={formik.isSubmitting}
            >
              <span
                className={`transition-transform duration-300 ease-in-out ${
                  isSubmitting ? "mr-2 translate-x-1 transform" : ""
                }`}
              >
                Login
              </span>
              {isSubmitting && <FiLoader className="animate-spin-slow ml-2" />}
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

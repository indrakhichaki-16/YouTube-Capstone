import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  // State to store the selected profile image file
  const [selectedImage, setSelectedImage] = useState(null);
  // useForm provides methods to handle form input & validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // Function to handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePicture", selectedImage); // optional image upload
    try {
      // Ensure passwords match before sending data
      if (data.password === data.repeatPassword) {
        let res = await fetch("http://localhost:3000/register", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          toast.success("User Registered Successfully.");
          navigate("/login");
        }
      }
    } catch (err) {
      console.log("Failed to register an user", err);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] flex justify-center items-center">
      <div className="glassmorphism-container w-[90%] max-w-lg p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
        <h1 className="uppercase text-2xl font-bold text-center mb-2 tracking-wide text-gray-800">Create Account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="glassmorphism-input"
            type="text"
            placeholder="Your Full Name"
            {...register("name", {
              required: "Your name field is empty!",
              validate: (value) => value.trim().split(" ").length >= 2 || "Please enter your full name",
            })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          <input
            className="glassmorphism-input"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: { value: true, message: "Your email field is empty!" },
            })}
          />
          <input
            className="glassmorphism-input"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Your password field is empty!" },
            })}
          />
          <input
            className="glassmorphism-input"
            type="password"
            placeholder="Repeat Your Password"
            {...register("repeatPassword", {
              required: { value: true, message: "Your repeat password field is empty!" },
            })}
          />
          <div className="flex gap-2 items-center">
            <label htmlFor="profilePicture" className="text-gray-700">Upload Image <span className="text-xs text-gray-500">(optional)</span>:</label>
            <div className="relative inline-block">
              <input
                {...register("profilePicture")}
                className="absolute top-1 -left-10 opacity-0 cursor-pointer"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <span className="px-2 py-1 rounded-lg border-dashed border bg-white cursor-pointer select-none text-gray-700">
                {selectedImage ? selectedImage.name : "Upload Profile Image"}
              </span>
            </div>
          </div>
          <input
            className="glassmorphism-btn mt-2"
            type="submit"
            value="Sign Up"
          />
        </form>
        <div className="text-sm self-center mt-2 text-gray-700">
          <span>Have already an account?</span>
          <Link to="/login" className="underline font-medium mx-1 hover:text-blue-600 transition-colors">Login here</Link>
        </div>
      </div>
    </div>
  );
}

// Export component for use in app
export default Register;

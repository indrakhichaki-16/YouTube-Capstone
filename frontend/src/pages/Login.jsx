import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // Destructure form handling methods from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Used to programmatically navigate between pages
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Send login request to backend
      let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let user = await res.json();
      if (res.ok) {
        // Store user details in localStorage for persistence
        localStorage.setItem("token", user.token);
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("avatar", user.avatar);
        toast.success("User loggedIn successfully!");
        navigate("/");
      }
    } catch (err) {
      // Log error and show error toast notification
      console.log("Failed to Login", err);
      toast.error("Failed to login");
    }
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] flex justify-center items-center">
      <div className="glassmorphism-container w-[90%] max-w-lg p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
        <h1 className="uppercase text-2xl font-bold text-center mb-2 tracking-wide text-gray-800">Login to your account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", {
              required: { value: true, message: "email is empty!" },
            })}
            className="glassmorphism-input"
            type="email"
            placeholder="Your Email"
          />
          <input
            {...register("password", {
              required: { value: true, message: "password is empty!" },
            })}
            className="glassmorphism-input"
            type="password"
            placeholder="Password"
          />
          <input
            className="glassmorphism-btn mt-2"
            type="submit"
            value="Sign In"
          />
        </form>
        {(errors.email || errors.password) && (
          <p className="text-red-500 font-semibold text-center">
            {errors.email?.message || errors.password?.message}
          </p>
        )}
        <div className="text-sm self-center mt-2 text-gray-700">
          <span>Don't have an account?</span>
          <Link to="/register" className="underline font-medium mx-1 hover:text-blue-600 transition-colors">Register</Link>
        </div>
      </div>
    </div>
  );
}

// Export Login component for use in other parts of the app
export default Login;

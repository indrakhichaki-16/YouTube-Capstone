import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreateChannel() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // Using react-hook-form for form handling
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("channelName", data.channelName);
    formData.append("channelHandle", data.channelHandle);
    formData.append("channelDescription", data.channelDescription);
    formData.append("userImg", userImg);
    if (termsAccepted) {
      try {
        let res = await fetch("http://localhost:3000/create-channel", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          navigate("/channel");
          toast.success("Channel created successfully!");
          setUserImg(null);
          setPreviewImg(null);
        } else {
          const errorData = await res.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error creating channel:", err);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] flex justify-center items-center">
      <div className="glassmorphism-container xl:w-1/2 md:w-[70%] w-[90%] p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2 tracking-wide text-gray-800">How you'll appear</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                src={
                  previewImg ||
                  "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                }
                alt="profile img"
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setUserImg(file);
                    setPreviewImg(URL.createObjectURL(file));
                  } else {
                    setUserImg(null);
                    setPreviewImg(
                      "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    );
                  }
                }}
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer text-sm">
              Select Picture
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label htmlFor="channelName" className="text-gray-700 font-medium w-20">Name:</label>
              <input
                {...register("channelName", { required: "Channel name is required" })}
                placeholder="Your Channel Name"
                className="glassmorphism-input flex-1"
                type="text"
                id="channelName"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="channelHandle" className="text-gray-700 font-medium w-20">Handle:</label>
              <input
                {...register("channelHandle")}
                placeholder="@your_channel_handle"
                className="glassmorphism-input flex-1"
                type="text"
                id="channelHandle"
              />
            </div>

            <div className="flex items-start gap-3">
              <label htmlFor="channelDescription" className="text-gray-700 font-medium w-20 mt-2">Description:</label>
              <textarea
                {...register("channelDescription")}
                placeholder="channel description"
                className="glassmorphism-input flex-1 min-h-[80px] resize-none"
                id="channelDescription"
              ></textarea>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
            <input
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              type="checkbox"
              className="mt-1 cursor-pointer"
              id="terms"
            />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              By clicking you agree to the terms and conditions for creating your channel.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glassmorphism-btn"
              disabled={!termsAccepted}
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;

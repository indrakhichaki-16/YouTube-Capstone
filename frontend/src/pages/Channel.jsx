import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Outlet } from "react-router";
import { useRef } from "react";

function Channel() {
  //State for channel details
  const [channel, setChannel] = useState({});
  //State to show uploading progress
  const [isUploading, setIsUploading] = useState(false);
  // Hook for navigation between routes
  const navigate = useNavigate();
  // Reference for file input to trigger file selection
  const fileInputRef = useRef(null);

  const fetchChannel = async () => {
    try {
      const response = await fetch("http://localhost:3000/channel");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const channel = await response.json();
      setChannel(channel.data[0]);  // assuming API returns { data: [...] }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // Fetch channel data when component mounts
  useEffect(() => {
    fetchChannel();
  }, []);

  const uploadBannerFile = async (file) => {
    // File validation: presence check
    if (!file) {
      toast.info("Please upload the file!");
      return;
    }
    // File validation: type check
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or WEBP images are allowed");
      return;
    }
    // File validation: size check (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("banner-img", file);
      formData.append("channelHandle", channel.handle);
      const res = await fetch("http://localhost:3000/channel", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success("Banner updated successfully!");
        fetchChannel();
      } else {
        toast.error("Failed to upload banner");
      }
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadBanner = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadBannerFile(file);
      // reset input so same file can be selected again
      e.target.value = "";
    } else {
      toast.info("Please upload the file!");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center gap-3 p-1 box-border">
        <div className="md:w-[90%] w-[95%] h-[220px] relative">
          {channel.bannerImg ? (
            <div className="w-full h-full relative group overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000${channel.bannerImg}`}
                alt="banner_image"
              />
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                <p className="text-xs text-white/80">Recommended size: 2048x1152 • Max 5MB</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-md bg-white/90 hover:bg-white text-gray-800 text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  {isUploading ? "Uploading..." : "Change banner"}
                </button>
              </div>
              <input
                ref={fileInputRef}
                onChange={uploadBanner}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
              />
            </div>
          ) : (
            <div
              className="w-full h-full rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-4"
            >
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-gray-700 font-medium">Upload your banner</p>
                <p className="text-xs text-gray-500">PNG, JPG, or WEBP up to 5MB</p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
                  >
                    {isUploading ? "Uploading..." : "Browse files"}
                  </button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                onChange={uploadBanner}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
              />
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col items-center gap-2.5 md:w-[90%] w-full">
          <div className="w-[150px] h-[150px]">
            <img
              className="w-full h-full rounded-full"
              src={
                channel?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              }
              alt="profile_pic"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{channel.name}</h2>
            <div className="flex gap-1 text-sm text-gray-500">
              <p className="text-gray-500">{channel.handle}</p>
              <p className="text-gray-500">17k subscribers</p>
              <p className="text-gray-500">100k views</p>
            </div>
            <div className="text-sm text-gray-500">
              <span>{channel.description}</span>
              {channel.description?.length > 15 && (
                <span className="ml-1">...more</span>
              )}
            </div>
            <div className="text-sm">
              <a className="text-blue-600 hover:underline" href="">
                xyz.com
              </a>
            </div>
            <button className="w-max self-center md:self-start bg-black text-white px-4 py-1 my-1 rounded-full cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
        {/* Label-style tab navigation (no glassy strip) */}
        <nav className="md:w-[90%] w-full mt-2">
          <div className="inline-flex gap-6">
            <NavLink
              to={"/channel/home"}
              className={({ isActive }) =>
                `pb-1 text-sm md:text-base tracking-wide transition-colors duration-150 ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:border-b hover:border-blue-400"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/channel/addVideos"}
              className={({ isActive }) =>
                `pb-1 text-sm md:text-base tracking-wide transition-colors duration-150 ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:border-b hover:border-blue-400"
                }`
              }
            >
              Add Videos
            </NavLink>
          </div>
        </nav>
        <div className="md:w-[90%] w-[95%] border border-gray-300"></div>
        <Outlet />
      </div>
    </>
  );
}

export default Channel;

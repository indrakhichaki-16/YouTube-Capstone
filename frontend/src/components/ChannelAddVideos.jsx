import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/inputFileStyle.css";
import { toast } from "react-toastify";

function ChannelAddVideos() {
  // Store channel info fetched from backend
  const [channel, setChannel] = useState({});
  // File states for video and thumbnail upload
  const [video, setVideo] = useState(null);
  // State for thumbnail upload
  const [thumbnail, setThumbnail] = useState(null);
  // State for video description and title
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  
  // Navigation hook
  const navigate = useNavigate();

  const fetchChannel = async () => {
    try {
      const response = await fetch("http://localhost:3000/channel");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const channel = await response.json();
      setChannel(channel.data[0]);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };
  // Fetch channel data on component mount
  useEffect(() => {
    fetchChannel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare multipart form data
    const formData = new FormData();
    formData.append("channelHandle", channel.handle);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:3000/channel", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        navigate('/channel/home');
        toast.success("video uploaded successfully!")
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Sorry, unfortunatly your video can't be uploaded");
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <form
        className="glassmorphism-container md:w-[70%] w-full flex flex-col gap-5 rounded-2xl shadow-2xl p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">Upload a new video</h2>

        <div className="flex items-center gap-3">
          <label className="w-28 text-gray-700">Video:</label>
          <input
            className=""
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-gray-700">Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-gray-700">Video Title:</label>
          <input
            type="text"
            className="glassmorphism-input flex-1"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter a title"
          />
        </div>

        <div className="flex items-start gap-3">
          <label className="w-28 text-gray-700 mt-2">Description:</label>
          <textarea
            className="glassmorphism-input flex-1 min-h-[120px] resize-none"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Write something about your video..."
          ></textarea>
        </div>

        <div className="w-max self-center">
          <button
            className="glassmorphism-btn"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChannelAddVideos;

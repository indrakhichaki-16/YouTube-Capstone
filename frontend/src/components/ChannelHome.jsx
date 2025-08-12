import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function ChannelHome() {
  // State for channel data
  const [channel, setChannel] = useState({});
  // State to track which video index is hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", description: "", thumbnail: null });
  const [editingIds, setEditingIds] = useState({ channelId: "", videoId: "" });

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

  const openEditModal = (video, channelId) => {
    setEditingIds({ channelId, videoId: video._id });
    setEditForm({ title: video.title || "", description: video.description || "", thumbnail: null });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditForm({ title: "", description: "", thumbnail: null });
    setEditingIds({ channelId: "", videoId: "" });
  };

  const handleEditVideo = async (videoId, channelId) => {
    const video = channel.videos.find((v) => v._id === videoId);
    if (!video) return;
    openEditModal(video, channelId);
  };

  const handleDeleteVideo = async (videoId, channelId) => {
    try {
      let res = await fetch("http://localhost:3000/channel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, channelId }),
      });
      if (res.ok) {
        fetchChannel(); // refresh database:-
        toast.success("Video deleted successfully!");
      }
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Sorry! your video can't be deleted");
    }
  };

  const submitEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("channelId", editingIds.channelId);
      formData.append("videoId", editingIds.videoId);
      formData.append("title", editForm.title.trim());
      formData.append("description", editForm.description);
      if (editForm.thumbnail) {
        formData.append("thumbnail", editForm.thumbnail);
      }

      const res = await fetch("http://localhost:3000/channel", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Video updated successfully!");
      closeEditModal();
      fetchChannel();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update video");
    }
  };

  return (
    <>
      <div className="videos md:w-[90%] w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 px-1 perspective-normal perspective-origin-top">
        {channel.videos?.length > 0 ? (
          channel.videos.map((video, index) => {
            return (
              <div
                onClick={(e) => {
                  if (e.target.closest(".menu_btn")) {
                    return;
                  }
                  navigate("/channel-player", {
                    state: { video: video, profilePic: channel.profilePic },
                  });
                }}
                key={video._id}
                className="card flex flex-col gap-2 cursor-pointer shadow rounded-lg hover:translate-z-1"
              >
                <div className="w-full">
                  <img
                    className="w-full rounded-lg"
                    src={`http://localhost:3000${video.thumbnail}`}
                    alt="video-thumbnail"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{video.title}</h3>
                    <div
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                      }}
                      className="relative menu_btn"
                    >
                      <img
                        className="w-full h-full cursor-pointer"
                        src="../src/assets/menu.svg"
                        alt="menu_btn"
                      />
                      {hoveredIndex === index && (
                        <div className="absolute top-0 left-0 z-10 w-max flex flex-col items-center justify-center gap-1 shadow rounded-lg px-2 py-1 bg-white">
                          <button
                            type="button"
                            onClick={() => {
                              handleEditVideo(video._id, channel._id);
                            }}
                            className="w-full rounded px-2 py-1 cursor-pointer hover:bg-slate-400"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteVideo(video._id, channel._id);
                            }}
                            className="w-full rounded px-2 py-1 cursor-pointer hover:bg-slate-400"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2.5 text-sm text-gray-500 mt-1.5">
                    <p>{video.views} views</p>
                    <p>{video.uploadDate?.split("T")[1]?.slice(0, -1)} ago</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No videos Uploaded</h2>
          </div>
        )}
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Edit video</h3>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail (optional)</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => setEditForm((f) => ({ ...f, thumbnail: e.target.files?.[0] || null }))}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChannelHome;

import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { getImageURL } from "../../lib/utils";
import React from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: <div>Copy</div>,
  },
  {
    key: "2",
    label: <div>Delete</div>,
  },
];

function DashboardFeed() {
  const data = {
    name: "test",
    description: "test",
    url: "https://example.com",
    date: "2022-01-01 10:00:00.123Z",
    image: "null",
  };
  const [file, setFile] = useState();
  const [imageList, setImageList] = useState(null);

  useEffect(() => {
    fetchImageData();
  }, []);

  const fetchImageData = async (event) => {
    try {
      const resultList = await pb.collection("upload").getList(1, 20);

      console.log(resultList);
      setImageList(resultList);
    } catch (e) {
      alert(e);
    }
  };

  async function handleDeleteImage(targetImg) {
    const deleteImg = await pb.collection("upload").delete(targetImg);
    window.location.reload();
  }

  function copyUrl(target, title) {
    toast.success(`${title}copied`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    copy(target);
  }
  async function handleChange(event) {
    const formData = new FormData();
    formData.append("field", event.target.files[0]);
    formData.append("title", event.target.files[0].name);

    try {
      const record = await pb.collection("upload").create(formData);
      window.location.reload();
      const deleteImg = await pb.collection("upload").delete("");
    } catch (e) {
      alert(e);
    }
  }

  const handleMenuClick = (e, data) => {
    if (e.key === "1") {
      copyUrl(
        getImageURL(data.collectionId, data.id, data.field, 100),
        data.title
      );
    }
    if (e.key === "2") {
      handleDeleteImage(data.id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full p-4">
        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">CLICK TO ADD NEW</span>
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 p-4 ">
        {imageList?.items.map((data, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-2 border rounded-md mr-2 mb-2"
          >
            <img
              src={getImageURL(data.collectionId, data.id, data.field, 100)}
              alt=""
              className="w-10 h-10 mr-2"
            />
            <div className="">
              <p className="font-semibold text-sm">{data.title}</p>
              <p className="text-xs text-gray-400">
                {moment(data.created).format("DD/MM/YYYY")}
              </p>
            </div>
            <Dropdown
              menu={{
                items,
                onClick: (e) => handleMenuClick(e, data),
              }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default DashboardFeed;

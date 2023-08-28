import React from "react";
import { useNavigate } from "react-router-dom";
export default function Popup({
  title,
  openPopup,
  value,
  change,
  Error,
  Submit,
  Touched,
  apierror,
  loading,
  success
  
}) {
    let naviate = useNavigate()

    if(success){
        setTimeout(()=>{
naviate("/dashboard")
        },1000)
    }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded p-4 shadow-md z-20 w-64 md:w-1/4">
        <form onSubmit={Submit}>
          <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
            {title}
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => openPopup()}
            >
              ✕
            </button>
          </h2>
          {success && <p className="bg-green-400 px-5 py-3 my-3 text-md text-black-500">{success}</p>}
          {apierror && <p className="bg-gray-100 px-5 py-3 my-3 text-md text-red-500">{apierror}</p>}
          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={value.userName}
              onChange={change("userName")}
            />
            {Error.userName && Touched.userName ?<span className="text-red-500 text-sm">{Error.userName}</span> : ""}
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1"
              value={value.password}
              onChange={change("password")}
            />
                        {Error.password && Touched.password ?<span className="text-red-500 text-sm">{Error.password}</span> : ""}

          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            type="submit"
            disabled={loading}
          >
           {!loading ? title : "Submitting ..."}
          </button>
        </form>
      </div>
    </div>
  );
}

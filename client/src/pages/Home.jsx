import React from "react";
import Header from "./Header";

export default function Home() {
  return (
    <div className="bg-gray-100 overflow-hidden  h-screen">
      
      <div className="container mx-auto overflow-hidden ">
        <div className=" h-screen md:pt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:content-center lg:-mt-16 gap-5 justify-between">
          <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-medium uppercase text-black">
              Lorem Ipsum is not simply random text
            </h1>
            <p className="text-gray-700 text-base md:text-xl">
              Printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially
              unchanged.
            </p>
          </div>
          <div className="p-6 md:p-0 md:mt-12 w-[95%] h-[95%]">
            {/* <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMHNob3B8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt="banner"
              className="w-full h-auto md:h-[80%] md:w-auto drop-shadow-md rounded-md transition duration-300 transform hover:scale-105"
            /> */}
     <embed className="h-[400px] w-full" src="https://lottie.host/?file=564642b7-870f-4d68-9ce6-aef5d47ba1bf/vycg9IUHFh.json"></embed>
          </div>
        </div>
      </div>
    </div>
  );
}

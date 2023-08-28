import React from 'react'

export default function ProductsCard({title,image,price}) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 border-slate-200 border-[1px]">
    <div className="w-full h-full">
      <img
        className="object-fit w-full h-[250px]"
        src={image}
        alt={title}
      />
    </div>
    <div className="card-body p-4">
      <h2 className="card-title text-xl font-medium">{title}</h2>
      <p className="text-gray-600">{price}</p>
    </div>
  </div>
  
  )
}

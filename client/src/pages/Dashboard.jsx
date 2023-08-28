import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProductsCard from '../components/ProductsCard';
import { ProductsAsync } from '../features/products/product.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const { products, error, loading, success } = useSelector((state) => state.product);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    dispatch(ProductsAsync());
  }, []);

  if ((loading || success === null) && !error) return <h1>Loading ...</h1>;
  if (success !== null && !error && products === null) return <h1>No data available</h1>;

  return (
    <div className='h-screen bg-gray-100'>

      <div className='container mx-auto py-8 h-[95vh]'>
        <div className='join join-vertical w-full h-full'>
          <div className='collapse-arrow-group  grid gap-4'>
            {products && Object.keys(products).map((item, index) => (
              <div
                key={index}
                className={`collapse collapse-arrow border border-gray-300 rounded-xl shadow-md ${
                  index === activeIndex ? 'open bg-white' : ''
                } transition-all duration-300 ease-in-out overflow-hidden`}
              >
                <input
                  type='radio'
                  name='my-accordion-1'
                  className='rounded-xl'
                  checked={index === activeIndex}
                  onChange={() => handleAccordionClick(index)}
                />
                <div className='collapse-title text-xl font-semibold px-4 py-2 text-gray-700 bg-white flex items-center capitalize'>
                  {item}
                </div>
                <div className={`collapse-content px-4 py-2 ${index === activeIndex ? "" : "hidden"}`}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {products[item].map(({ title, thumbnail, price, id }) => (
                      <ProductsCard key={id} title={title} image={thumbnail} price={price} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

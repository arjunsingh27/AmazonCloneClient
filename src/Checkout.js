import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import Product from './Product'
import { useStateValue } from './StateProvider'
import Item from './Item'

function Checkout() {
  const [{ basket , user},] = useStateValue();
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img className='checkout__ad' src='https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=2520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='amazon ad' />
        <div>
          <h3>Hello, {!user?'Guest':user.email}</h3>
          <h2 className='checkout__title'>Your Shopping Basket</h2>
        </div>
        <div className='checkout__basket'>
          {basket.map(item => (
            <Item
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
               />
          ))}
          </div>
      </div>
      <div className='checkout__right'>
        <Subtotal />
       
      </div>
    </div>
  )
}

export default Checkout
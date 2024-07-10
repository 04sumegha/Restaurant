import React, {useState} from 'react'
import { items } from '../../items'
import './Order.css'

const ItemCard = ({id, itemImage, itemName, itemPrice, addToCart}) => {
  return (
    <div className='item'>
      <img src={itemImage} alt=''/>
      <h3>{itemName}</h3>
      <h4>{itemPrice}</h4>
      <button onClick={() => addToCart({id, itemImage, itemName, itemPrice})}>Add</button>
    </div>
  )
}

const Cart = ({id, itemImage, itemName, itemPrice, increaseQuantity, decreaseQuantity, quantity}) => {
  return(
    <div className='cart-items'>
      <div className='left-side'>
        <img src={itemImage} alt="" />
        <h3>{itemName}</h3>
        <p>{itemPrice}</p>
      </div>
      <div className='right-side'>
        <button onClick={() => increaseQuantity(id)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => decreaseQuantity(id)}>-</button>
      </div>
    </div>
  )
}

const Order = () => {

  const soup = items.filter(item => (
    item.type === "soup"
  ))
  
  const snacks = items.filter(item => (
    item.type === "snacks"
  ))

  const bbq = items.filter(item => (
    item.type === "bbq"
  ))

  const curry = items.filter(item => (
    item.type === "curry"
  ))

  const rice = items.filter(item => (
    item.type === "rice"
  ))

  const roti = items.filter(item => (
    item.type === "roti"
  ))

  const desert = items.filter(item => (
    item.type === "desert"
  ))

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if(existing){
      setCartItems(cartItems.map(item => (
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      )))
    }
    else{
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
    console.log(cartItems)
  }

  const increaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => (
      item.id === productId ? {...item, quantity: item.quantity + 1} : item
    )))
  }

  const decreaseQuantity = (productId) => {
    setCartItems(item => {
      const updatedCart = cartItems.map(item => (
        item.id === productId ? {...item, quantity: Math.max(0, item.quantity - 1)} : item
      ))
      return updatedCart.filter(item => item.quantity > 0)
    })
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0)

  return (
    <div className='order-box'>
      <button className='place' onClick={() => setIsCartOpen(true)}>View Order</button>
      <div className='menu-content'>
        <div className='category'>
          <h2>Soup</h2>
          {soup.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>Snacks</h2>
          {snacks.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>BBQ</h2>
          {bbq.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>Curry</h2>
          {curry.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>Rice</h2>
          {rice.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>Roti</h2>
          {roti.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className='category'>
          <h2>Desert</h2>
          {desert.map(item => (
            <ItemCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
      </div>
      {isCartOpen &&
        <div className='cart'>
          <h1>Order</h1>
          <button className='close-button' onClick={() => setIsCartOpen(false)}>X</button>
          {cartItems.map(item => (
            <Cart key={item.id} {...item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
          ))}
          <p className='total'>Total Price: {totalPrice}</p>
          {cartItems.length !== 0 && 
            <div className='table'>
              <p>Choose A Table From 1 to 10</p>
              <input type="number" name="table number" min={1} max={10} />
            </div>
          }
          {cartItems.length !== 0 && 
            <button className='place-order'>Place Order</button>
          }
        </div> 
      }
    </div>
  )
}

export default Order

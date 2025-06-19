import React, { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
   <form className='place-order'>
    <div className="place-order-left">
      <p className='title'>Delivery Information</p>
      <div className="multi-fields">
        <input type="text" placeholder='First Name'/>
        <input type="text" placeholder='Last Name'/>
      </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>

        <div className="multi-fields">
        <input type="text" placeholder='City'/>
        <input type="text" placeholder='State'/>
      </div>
       
        <input type="text" placeholder='Country'/>
      
      <input type='text' placeholder='Phone'/>
    </div>
     <div className="place-order-right">
       <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>RS/- {getTotalCartAmount()}</p>
              </div>
              <hr/>

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>RS/- {getTotalCartAmount()===0?"0":"100"}</p>
              </div>
              <hr/>

              <div className="cart-total-details">
                <b>Total</b>
                <b>RS/- {getTotalCartAmount()===0?"0":getTotalCartAmount()+100}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
    </div>
   </form>
  )
}

export default PlaceOrder;
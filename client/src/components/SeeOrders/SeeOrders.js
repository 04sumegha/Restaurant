import React, {useState, useEffect} from 'react'
import './SeeOrders.css'
import axios from 'axios'

const SeeOrders = () => {

    const [orders, setOrders] = useState([]);

    const getOrders = async() => {
        try {
            const token = window.localStorage.getItem("cookies");
            console.log(token)
            const result = await axios.get("http://localhost:8000/api/order/get", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result);
            setOrders(result.data)
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getOrders();
    }, [])

  return (
    <div className='box'>
      <table>
        <thead>
          <tr>
            <th className='heading'>Items</th>
            <th className='heading'>Table Number</th>
            <th className='heading'>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>
                <ul>
                  {item.items.map((first) => (
                    <li key={first.id}>
                      {first.name}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{item.tableNumber}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SeeOrders

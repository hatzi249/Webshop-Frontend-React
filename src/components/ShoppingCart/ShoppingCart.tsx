import Axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { IProduct } from '../Products/Products';
import './ShoppingCart.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface IChildProps {
    productValue: IProduct[];
    removeProduct(product: IProduct): void;
    clearCart(product: IProduct[]): void;
}


export default function ShoppingCart(props: IChildProps) {
    const [customerEmail, setCustomerEmail] = useState('');

    
    function updateCustomerEmail(e:ChangeEvent<HTMLInputElement>){
        setCustomerEmail(e.target.value);
    }
    
    let totalPrice = props.productValue.reduce((a, c) => a + c.price * c.count, 0)

    const value = props.productValue;
    const clearProducts = (value: IProduct[]) => {
        props.clearCart(value);
    }

    let orderProducts = props.productValue.map((product: IProduct) => {
        return(
            {
             //id: 0,
             productId: product.id,
             productName: product.productName,
             //price: product.price,
             //description: product.description
             //product: null,
             //amount: product.count,
             //orderId: 0
            }
        );  
    });
    
      async function checkOut() {
        
          let params = {
              id: 0,
              customerId: customerEmail,
              //orderDate: new Date(),
              //companyId: 3981,
              //created: new Date(),
              //createdBy: customerEmail,
              //paymentMethod: "mastercard",
              totalPrice: props.productValue.reduce((a, c) => a + c.price * c.count, 0),
              //status: 0,
              //orderRows: orderProducts
              products: orderProducts,
          }
          let res = await Axios.post('https://localhost:5001/orders',
          params)

          clearProducts(value);
          console.log(res.data);
      };
      

    let cartProducts = props.productValue.map((product:IProduct) => {
        return (
            <div className="box"key={product.id}>
                    <Card style={{ width: '18rem', height:'100%' }}>
                        <Card.Img variant="top" src={product.photo}/>
                        <Card.Body>
                            <Card.Title>{product.count} x {product.productName}, {product.price} kr"</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>props.removeProduct(product)}>
                            Delete</Button>
                        </Card.Body>
                    </Card>
            </div>
        )
    });

    return (
        <div>
            <div className="grid">
                {cartProducts}
            </div>
            <p>Please enter your Customer Id:</p>
            <input type="customerId" id="customerId" onChange={updateCustomerEmail}/>
            <h2>Total price: {totalPrice}kr</h2>
            <button type="button" className="checkout" onClick={()=>checkOut()}>
                Checkout
            </button>
        </div>
    )
};
//

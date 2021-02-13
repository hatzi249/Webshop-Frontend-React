import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'

interface IOrder {
    id: number;
    customerId: number;
    orderDate: Date;
    totalPrice: number;
    orderDetails: IOrderDetails
}

export interface IOrderDetails {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
}

export default function Admin() {
    const defaultValue: IOrder[] = [];
    //const defaultValue2: IOrderDetails[] = [];
    const [orders, setOrders] = useState(defaultValue);
    //const [orderDetails, setOrderDetails] = useState(defaultValue2);

    useEffect(() => {

        axios.get('https://localhost:5001/orders')
            .then(result => {
                setOrders(result.data);
            });
    }, []);

    /* useEffect(() => {

        axios.get('https://localhost:5001/orderDetails')
            .then(result => {
                setOrderDetails(result.data);
            });
    }, []); */

    async function deleteOrder(id: number) {

        axios.delete(`https://localhost:5001/orders/${id}`)
            .then(result => {
                console.log(result);
                const filteredOrders = orders.filter(item => item.id !== id);
                setOrders(filteredOrders);
            });
    };

    let productsInOrder = orders.map((orders: IOrder)=> {
        return (
            <ul key={orders.id}>
                <li>Products included:{orders.orderDetails.productName}</li>
            </ul>
        )
    })

    let ordersHtml = orders.map((orders: IOrder) => {
        
        return (
        <ul key={orders.id}>
            <li>Order id:{orders.id}</li>
            <li>Order created by:{orders.customerId}</li>
            <li>Date:{orders.orderDate}</li>
            <li>Total price is:{orders.totalPrice}</li>
            <li>Products included:{productsInOrder}</li>
            <button type='button' onClick={()=>deleteOrder(orders.id)}>Delete order</button>
        </ul>
        );
    });

    return (
        <div>
        {ordersHtml}
        </div>
    );
};
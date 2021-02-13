import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { IProduct } from '../Products/Products';

interface IChildProps {
    productValue: IProduct[];
}


export default function Header(props: IChildProps) {


    return (
        <nav>
            <ul>
                <Link to='/'>
                    <li>Main</li>
                </Link>
                <Link to='/shoppingcart'>
                    <li>Shopping Cart: {props.productValue.length}</li>
                </Link>
                <Link to='/admin'>
                    <li>Admin</li>
                </Link>
            </ul>
        </nav>
    );
}

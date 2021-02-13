import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export interface IProduct {
    id: number;
    productName: string;
    price: number;
    description:string;
    photo: string;
    //year: number;
    count: number;
    sizes: ISize;
};

export interface ISize {
    id: number;
    productId: number;
    sizeNumber: number;
}

interface IProductProps {
    updateShoppingCart(product: IProduct): void;
}

export default function Products(props: IProductProps) {
    const defaultValue: IProduct[] = [];
    const defaultValue2: ISize[] = [];
    const [products, setProducts] = useState(defaultValue);
    const [sizes, setSizes] = useState(defaultValue2);

    
    useEffect(() => {

        axios.get('https://localhost:5001/products/')
            .then(result => {
                setProducts(result.data);
            });
    }, []);

    useEffect(() => {

         axios.get('https://localhost:5001/sizes/')
            .then(result => {
                setSizes(result.data);
            });
    }, []);

    
    function addToCart(product: IProduct) {
        props.updateShoppingCart(product)
    }
    
    /* let sizesHtml = products.map((product: IProduct) => {
        return(
            <div key={product.sizes.id} className="">
                <Button variant="dark">{product.sizes.sizeNumber}</Button>
            </div>
        )
    }) */
    let sizesHtml = sizes.map((size:ISize) => {
        return(
            <div key={size.id} className="">
                <Button variant="dark">{size.sizeNumber}</Button>
            </div>
        )
    })

    let productsHtml = products.map((product:IProduct) => {
        return (
            <div key={product.id} className="box">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.photo}/>
                    <Card.Body>
                        <Card.Title>{product.productName}{", "}{product.price}{" kr"}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <Button variant="primary" onClick={() => addToCart(product)}>
                        Add to cart</Button>
                        {sizesHtml}
                    </Card.Body>
                </Card>
            </div>
        );
    })
    
    return (
        <div className="grid">  
            {productsHtml}
        </div>
    );
}

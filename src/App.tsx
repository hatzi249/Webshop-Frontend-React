import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Products, { IProduct } from './components/Products/Products';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';



function App() {
  const defaultValue: IProduct[] = [];
  const [cart, setCart] = useState(defaultValue);


  const updateCart =(product: IProduct) =>{
    const productsInCart = cart.slice();
    let alreadyInCart = false;
    productsInCart.forEach((addedProduct) =>{
      if (addedProduct.id === product.id) {
        addedProduct.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      productsInCart.push({...product, count: 1})
    }
    setCart(productsInCart);
    console.log(productsInCart);
  };


  const removeProduct = (product: IProduct) => {
    const productsInCart = cart.slice();
    let alreadyInCart = false;
    productsInCart.forEach((addedProduct) =>{
      if (addedProduct.id === product.id && addedProduct.count > 1) {
        addedProduct.count--;
        alreadyInCart = true;
      }
      setCart(productsInCart);
    });
    if (!alreadyInCart) {
      const productsInCart =cart.slice().filter((x) => x.id !== product.id);
      setCart(productsInCart);
    }
  }; 

  const clearCart = (addedProduct: IProduct[]) => {
    setCart([]);
  }


  return (
    <div className="App">
      <Router>
        <header>
          <Header productValue={cart}></Header>
        </header>

        <main>
          <Switch>

            <Route path="/admin">
              <Admin></Admin>
            </Route>

            <Route path="/shoppingcart">
              <ShoppingCart productValue={cart} clearCart={clearCart} 
              removeProduct={removeProduct}></ShoppingCart>              
            </Route>

            <Route path="/" exact={true}> 
              <Products updateShoppingCart={updateCart}></Products>
            </Route>

            <Route path="*" component={PageNotFound}></Route>

          </Switch>
        </main>

      </Router>
      
    </div>
  );
}

export default App;

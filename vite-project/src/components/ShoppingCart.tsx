import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addToCart, deleteFromCart, updateCart } from "../action/shopAction";
import store from "../store/store";
import "./ShoppingCart.scss";

const ShoppingCart = () => {
  const stateCart: any = useSelector((state) => {
    return state;
  });
  const clearCart = () => {
    store.dispatch({ type: "CLEAR_CART" });
  };

  const getTotal = stateCart.cart.reduce((accumulator: any, item: any) => {
    return accumulator + item.quantity * item.price;
  }, 0);

  const products = store.getState().products;
  const cart = store.getState().cart;
  console.log(products);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="shopping-cart">
      <div className="product-list">
        <h2>List Products</h2>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.img} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>quantity:{product.quantity}</p>
              <button onClick={() => addToCart(product)}>
                {product.price} USD
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Empty product in your cart</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stateCart.cart.map((item: any, index: any) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price} USD</td>
                    <td>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCart(item, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteFromCart(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>There are {cart.length} items in your shopping cart.</p>
            <p>Total:{getTotal} USD</p>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

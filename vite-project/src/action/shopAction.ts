import Swal from "sweetalert2";
import { Product } from "../components/types";
import store from "../store/store";

export const addToCart = (product: Product) => {
  console.log();
  
    store.dispatch({ type: "ADD_TO_CART", payload: product });
  };

export  const updateCart = (product: Product, quantity: number) => {
    if (quantity > product.quantity) {
      alert("Số lượng sản phẩm vượt quá số lượng trong kho");
      return;
    }
    store.dispatch({
      type: "UPDATE_CART",
      payload: { id: product.id, quantity },
    });
  };

export  const deleteFromCart = (product: Product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      
        store.dispatch({ type: "DELETE_FROM_CART", payload: product });
        
    });
  };


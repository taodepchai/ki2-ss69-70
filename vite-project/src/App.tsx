import { Provider } from "react-redux";
import ShoppingCart from "./components/ShoppingCart";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
     <ShoppingCart></ShoppingCart>
    </Provider>
  );
};

export default App;

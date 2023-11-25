import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MenuAccount from './components/Layout/MenuAcc';
import MenuLeft from './components/Layout/MenuLeft';
import Slider from './components/Layout/Slider';
import { useLocation } from 'react-router-dom';
import { AppContext } from './components/Product/AppContext';

function App(props) {
  let path = useLocation();
  let user = localStorage.getItem('user');
  let cartTotalItem = 0;

  if (user) {
    user = JSON.parse(user);
    cartTotalItem = localStorage.getItem('cartTotalItem');
  }
  function updateCartTotalItem() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartTotalItem = 0;
    if (cart) {
      Object.keys(cart).forEach(function (key) {
        cartTotalItem += cart[key].quantity;
      });
    }
    localStorage.setItem('cartTotalItem', cartTotalItem);
  }
  return (
    <AppContext.Provider value={{ cartTotalItem, updateCartTotalItem }} >
      <Header />
      {path['pathname'] === '/' ? <Slider /> : ''}
      <section>
        <div className="container">
          <div className="row">
            {path['pathname'].includes('account') ? <MenuAccount /> : ''}
            {path['pathname'].includes('cart') || path['pathname'].includes('wish-list') ? '' : <MenuLeft />}
            {props.children}
          </div>
        </div>
      </section>
      <Footer></Footer>
      <div id="overlay-notification">
        <div className="overlay-notification-content">
          <h3>Add to cart successfully!</h3>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;

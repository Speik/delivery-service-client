import { useCartStore } from '~/stores/cart';

const isCartShown = ref(false);

const useCart = () => {
  const cartStore = useCartStore();

  const showCart = () => {
    isCartShown.value = true;
  };

  const hideCart = () => {
    isCartShown.value = false;
  };

  return { isCartShown, showCart, hideCart, cartStore };
};

export { useCart };

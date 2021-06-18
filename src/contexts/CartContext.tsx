import { createContext, ReactNode, useContext, useState } from "react";

type Product = {
  id: number;
  createdAt: Date;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity?: number;
  total?: number;
};

type CartContextData = {
  productList: Product[];
  cartItens: number;
  addProduct: (prodcut: Product) => void;
  addQuantity: (product: Product) => void;
  removeQuantity: (product: Product) => void;
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [productList, setProductList] = useState([]);
  const [cartItens, setCartItens] = useState(0);

  function addProduct(product: Product) {
    if (productList.find((x) => x.id == product.id)) {
      addQuantity(product);
    } else {
      let newList = [...productList, { ...product, quantity: 1 }];

      setProductList(newList);
      setCartItens(newList.length);
    }
  }

  function addQuantity(product: Product) {
    productList.map((x) => {
      if (x.id == product.id) product.quantity = product.quantity + 1;
    });
  }

  function removeQuantity(product: Product) {
    productList.map((x) => {
      if (x.id == product.id) product.quantity = product.quantity - 1;
    });

    //TODO remover a lista totalmente
  }

  return (
    <CartContext.Provider
      value={{
        productList,
        cartItens,
        addProduct,
        addQuantity,
        removeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};

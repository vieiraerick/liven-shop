import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

type Product = {
  id: number;
  createdAt: Date;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  total: number;
};

export default function Cart() {
  const { productList, addQuantity, removeQuantity } = useCart();
  const [cartTotal, setCartTotal] = useState(0);

  // TODO atualizar o valor total do carrinho

  return (
    <div className={styles.cartPage}>
      <Head>
        <title>Carrinho | Liven Shop</title>
      </Head>

      <h1>Carrinho</h1>

      <ul>
        {productList.map((product) => {
          return (
            <li key={product.id}>
              <Image
                width={192}
                height={192}
                src={product.image}
                alt={product.name}
                objectFit="cover"
              />
              <div>
                <h3>{product.name}</h3>
                <p>Unitário: {formatCurrency(product.price)}</p>
                <p>Total: {formatCurrency(product.total)}</p>
                {/* TODO atualizar o valor total do produto */}
              </div>
              <section>
                <button type="button" onClick={() => removeQuantity(product)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <p>{product.quantity}</p>
                {/* TODO Atualizar os valores ao clicar no botão */}
                <button type="button" onClick={() => addQuantity(product)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </section>
            </li>
          );
        })}
      </ul>
      <h1>{formatCurrency(cartTotal)}</h1>
    </div>
  );
}

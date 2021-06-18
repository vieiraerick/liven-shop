import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./home.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("api/v1/product");

  const products = data.map((product) => {
    return {
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 8,
  };
};

type Product = {
  id: number;
  createdAt: Date;
  name: string;
  price: number;
  image: string;
  stock: number;
};

type HomeProps = {
  products: Product[];
};

export default function Home({ products }: HomeProps) {
  const { addProduct } = useCart();

  async function handleAddCartButton(e, product: Product) {
    e.preventDefault();
    addProduct(product);

    alert(`${product.name} adicionado ao carrinho`);
  }

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Home | Liven Shop</title>
      </Head>

      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Image
                width={192}
                height={192}
                src={product.image}
                alt={product.name}
                objectFit="cover"
              />
              <h3>{product.name}</h3>
              <p>{formatCurrency(product.price)}</p>
              <button
                type="button"
                onClick={(e) => handleAddCartButton(e, product)}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                Adicionar ao carrinho
              </button>
              <span>Estoque: {product.stock} unidades</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

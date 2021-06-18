import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

export function Header() {
  const { cartItens } = useCart();

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <p>Liven Shop</p>
        </a>
      </Link>
      <section>
        <Link href="/carrinho">
          <a>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItens > 0 && cartItens}
          </a>
        </Link>
      </section>
    </header>
  );
}

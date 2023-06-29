import { Products } from "./components/Products";
import { useFilters } from "./hooks/useFilters";
import { CartProvider } from "./context/cart";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { IS_DEVELOPMENT } from "./config.js";
import { Footer } from "./components/Footer";
import useSWR from "swr";
import { getProducts } from "./services/products";
import { Loader } from "./components/Loader";

function App() {
  const { data, isLoading, error } = useSWR("products", () => getProducts());

  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(data?.products);

  return (
    <>
      {error && <div>failed to load</div>}
      <CartProvider>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <>
            <Header />
            <Cart />
            <Products products={filteredProducts} />
          </>
        )}
        {IS_DEVELOPMENT && <Footer />}
      </CartProvider>
    </>
  );
}

export default App;

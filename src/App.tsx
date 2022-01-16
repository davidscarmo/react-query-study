import React, { useState } from "react";
import "./App.css";
import { ProductDetail } from "./Pages/Detail";
import { ProductList } from "./Pages/List";

function App() {
  const [productId, setProductId] = useState<number | null>(null);

  const onProductDetail = (id: number) => {
    setProductId(id);
  };
  const onBackToList = () => {
    setProductId(null);
  };
  return (
    <div className="App">
      {productId !== null ? (
        <ProductDetail id={productId} onBack={onBackToList} />
      ) : (
        <ProductList onProductDetail={onProductDetail} />
      )}
    </div>
  );
}

export default App;

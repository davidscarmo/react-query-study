import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../types/IProducts";
import { useQuery } from "react-query";

const fetchProduct = (id: number) => {
  return axios
    .get(`http://localhost:3333/products/${id}`)
    .then((response) => response.data);
};

type ProductDetailProps = {
  id: number;
  onBack: () => void;
};

export const ProductDetail = ({ id, onBack }: ProductDetailProps) => {
  const { data: product, isLoading } = useQuery([`product${id}`], () =>
    fetchProduct(id)
  );

  // const [product, setProduct] = useState<IProduct>();
  // const [isLoading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setLoading(true);

  //   fetchProduct(id)
  //     .then((data) => {
  //       setProduct(data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  if (isLoading || !product) {
    return <h1>Loading Product...</h1>;
  }

  return (
    <div className="container">
      <a
        href="#"
        onClick={() => {
          onBack();
        }}
      >
        Voltar a lista de produtos
      </a>

      <div className="row">
        <label> ID: :</label>
        {product.id}
      </div>

      <div className="row">
        <label>Name: </label>
        {product.name}
      </div>

      <div className="row">
        <label>Price: </label>
        {product.price}
      </div>

      <div className="row">
        <label>Description: </label>
        {product.description}
      </div>
      <div>
        <label>Image: </label>
        <img src={product.image} alt="product" />
      </div>
    </div>
  );
};

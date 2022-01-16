import React, { useState, useEffect } from "react";

import Axios from "axios";

import { IProduct } from "../../types/IProducts";
import { useQuery } from "react-query";

const fetchProducts = () => {
  return Axios.get(`http://localhost:3333/products`).then(
    (response) => response.data
  );
};

type ProductsListProps = {
  onProductDetail: (id: number) => void;
};
export const ProductList = ({ onProductDetail }: ProductsListProps) => {
  const { data: products, isLoading } = useQuery<IProduct[]>(
    ["products"],
    () => {
      return fetchProducts();
    },
    { staleTime: 2000 }
  );
  // const [products, setProducts] = useState<IProduct[]>([]);
  // const [isLoading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setLoading(true);

  //   fetchProducts()
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  if (isLoading || !products) {
    return <h1>loading products list....</h1>;
  }

  return (
    <div className="container">
      <h1>Producst list </h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <a
                  href="#"
                  onClick={() => {
                    onProductDetail(product.id);
                  }}
                >
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    console.log("resresresres", res);
    const data = await res.json();
    console.log(data, "datadatadata");

    if (data && data.products) {
      setProducts(data.products);
      console.log(data.products[0]?.title, "pppppppppppppppppp");
    }
  };
  console.log(products, "productsproducts");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <div className="products">
        {products.length > 0 &&
          products.slice(page * 10 - 10, page * 10).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-thumbnail"
              />
              <h2>{product.title}</h2>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Rating:</strong> {product.rating} ⭐
              </p>
              <p>
                <strong>Stock:</strong> {product.stock} units
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <a href={product.images[0]} target="_blank" rel="noreferrer">
                View Full Image
              </a>
            </div>
          ))}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={page === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </>
  );
}
export default App;

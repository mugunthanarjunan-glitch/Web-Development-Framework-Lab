import { useState } from "react";
import "./index.css";

function App() {
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [seller, setSeller] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Search state
  const [search, setSearch] = useState("");

  // Popup state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Products
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 13",
      description:
        "Used iPhone 13 in excellent condition. No major scratches and battery health is good.",
      price: "35000",
      category: "Electronics",
      seller: "Arun Kumar",
      phone: "9876543210",
      email: "arun@example.com",
    },
    {
      id: 2,
      title: "Study Table",
      description:
        "Wooden study table with storage drawers. Strong and well maintained.",
      price: "2500",
      category: "Furniture",
      seller: "Priya S",
      phone: "9123456780",
      email: "priya@example.com",
    },
    {
      id: 3,
      title: "Mountain Bicycle",
      description:
        "Well-maintained mountain bicycle suitable for daily rides and outdoor activities.",
      price: "8000",
      category: "Vehicles",
      seller: "Rahul M",
      phone: "9001234567",
      email: "rahul@example.com",
    },
  ]);

  // Add product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !price.trim() ||
      !seller.trim() ||
      !phone.trim() ||
      !email.trim()
    ) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      price: price.trim(),
      category,
      seller: seller.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    setProducts((currentProducts) => [
      newProduct,
      ...currentProducts,
    ]);

    // Clear form
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("Electronics");
    setSeller("");
    setPhone("");
    setEmail("");
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );

    // Close popup if deleted product was selected
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  // Search
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.seller.toLowerCase().includes(searchText)
    );
  });

  // Category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Electronics":
        return "📱";

      case "Furniture":
        return "🪑";

      case "Vehicles":
        return "🚲";

      case "Books":
        return "📚";

      case "Sports":
        return "⚽";

      case "Fashion":
        return "👕";

      default:
        return "📦";
    }
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">
        <div className="header-content">

          <div className="logo">
            <span>◆</span>
            UsedMart
          </div>

          <p>Buy & Sell Used Products</p>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            CLASSIFIEDS MARKETPLACE
          </p>

          <h1>
            Find it.
            <br />
            Buy it. Sell it.
          </h1>

          <p className="hero-description">
            Discover great products from people around you
            or post something you no longer need.
          </p>

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <main className="container">


        {/* ================= POST PRODUCT ================= */}

        <section className="post-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                SELL SOMETHING
              </p>

              <h2>
                Post a Product
              </h2>

            </div>

          </div>


          <form
            className="product-form"
            onSubmit={handleSubmit}
          >

            {/* Product title + category */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Product Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Samsung Galaxy S24"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option>
                    Electronics
                  </option>

                  <option>
                    Furniture
                  </option>

                  <option>
                    Vehicles
                  </option>

                  <option>
                    Books
                  </option>

                  <option>
                    Sports
                  </option>

                  <option>
                    Fashion
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* Description */}

            <div className="form-group">

              <label>
                Product Description
              </label>

              <textarea
                placeholder="Describe the condition and details of your product..."
                rows="4"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>


            {/* Seller information */}

            <div className="seller-heading">

              <p className="section-label">
                SELLER INFORMATION
              </p>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Seller Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={seller}
                  onChange={(e) =>
                    setSeller(e.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* Email */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="seller@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* Price + Submit */}

            <div className="form-bottom">

              <div className="form-group price-group">

                <label>
                  Price (₹)
                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  min="0"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="post-btn"
              >
                Post Product →
              </button>

            </div>

          </form>

        </section>


        {/* ================= PRODUCT LIST ================= */}

        <section className="products-section">

          <div className="products-header">

            <div>

              <p className="section-label">
                MARKETPLACE
              </p>

              <h2>
                Available Products
              </h2>

            </div>

            <span>
              {filteredProducts.length} products
            </span>

          </div>


          {/* Search */}

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Products */}

          {filteredProducts.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ⌕
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            <div className="products-grid">

              {filteredProducts.map((product) => (

                <article
                  className="product-card"
                  key={product.id}
                >

                  {/* Product icon */}

                  <div className="product-image">

                    {getCategoryIcon(
                      product.category
                    )}

                  </div>


                  <div className="product-content">

                    {/* Category + delete */}

                    <div className="product-top">

                      <span className="category">
                        {product.category}
                      </span>

                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </button>

                    </div>


                    {/* Title */}

                    <h3>
                      {product.title}
                    </h3>


                    {/* Description */}

                    <p>
                      {product.description}
                    </p>


                    {/* Seller */}

                    <div className="seller-preview">

                      <span className="seller-avatar">
                        {product.seller
                          .charAt(0)
                          .toUpperCase()}
                      </span>

                      <div>

                        <small>
                          Seller
                        </small>

                        <strong>
                          {product.seller}
                        </strong>

                      </div>

                    </div>


                    {/* Price + Contact */}

                    <div className="product-footer">

                      <strong className="price">
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}
                      </strong>

                      <button
                        className="contact-btn"
                        type="button"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        Contact Seller
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ================= CONTACT POPUP ================= */}

      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="contact-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close button */}

            <button
              className="modal-close"
              type="button"
              onClick={() =>
                setSelectedProduct(null)
              }
              aria-label="Close"
            >
              ×
            </button>


            {/* Icon */}

            <div className="modal-icon">
              👤
            </div>


            <p className="section-label">
              SELLER INFORMATION
            </p>


            <h2>
              {selectedProduct.seller}
            </h2>


            <p className="modal-product">
              Seller of{" "}
              <strong>
                {selectedProduct.title}
              </strong>
            </p>


            {/* Contact details */}

            <div className="contact-details">

              {/* Phone */}

              <div className="contact-detail">

                <span>
                  📞
                </span>

                <div>

                  <small>
                    Phone
                  </small>

                  <strong>
                    {selectedProduct.phone}
                  </strong>

                </div>

              </div>


              {/* Email */}

              <div className="contact-detail">

                <span>
                  ✉️
                </span>

                <div>

                  <small>
                    Email
                  </small>

                  <strong>
                    {selectedProduct.email}
                  </strong>

                </div>

              </div>

            </div>


            {/* Actions */}

            <div className="modal-actions">

              <a
                href={`tel:${selectedProduct.phone}`}
                className="call-btn"
              >
                📞 Call Seller
              </a>

              <a
                href={`mailto:${selectedProduct.email}`}
                className="email-btn"
              >
                ✉ Email Seller
              </a>

            </div>

          </div>

        </div>

      )}


      {/* ================= FOOTER ================= */}

      <footer>

        <p>
          UsedMart • Experiment 05
        </p>

      </footer>

    </div>
  );
}

export default App;
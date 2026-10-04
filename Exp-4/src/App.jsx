import { useState } from "react";
import "./index.css";

function App() {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      category: "Pizza & Italian",
      rating: "4.8",
      delivery: "25-30 min",
      menu: [
        {
          id: 101,
          name: "Cheese Pizza",
          description: "Classic cheese pizza with mozzarella and tomato sauce.",
          price: 200,
          emoji: "🍕",
        },
        {
          id: 102,
          name: "Veggie Pizza",
          description: "Fresh vegetables with mozzarella and Italian herbs.",
          price: 180,
          emoji: "🍕",
        },
        {
          id: 103,
          name: "Margherita Pizza",
          description: "Fresh tomato, mozzarella and basil.",
          price: 220,
          emoji: "🍕",
        },
      ],
    },
    {
      id: 2,
      name: "Burger House",
      category: "Burgers & Fast Food",
      rating: "4.6",
      delivery: "20-25 min",
      menu: [
        {
          id: 201,
          name: "Chicken Burger",
          description: "Crispy chicken burger with fresh lettuce and sauce.",
          price: 150,
          emoji: "🍔",
        },
        {
          id: 202,
          name: "Veg Burger",
          description: "Crispy vegetable patty with cheese and fresh vegetables.",
          price: 120,
          emoji: "🍔",
        },
        {
          id: 203,
          name: "Double Cheese Burger",
          description: "Double patty burger loaded with melted cheese.",
          price: 200,
          emoji: "🍔",
        },
      ],
    },
    {
      id: 3,
      name: "Spice Garden",
      category: "Indian Cuisine",
      rating: "4.7",
      delivery: "30-35 min",
      menu: [
        {
          id: 301,
          name: "Paneer Butter Masala",
          description: "Creamy tomato gravy with soft paneer cubes.",
          price: 180,
          emoji: "🍛",
        },
        {
          id: 302,
          name: "Veg Biryani",
          description: "Aromatic basmati rice cooked with vegetables and spices.",
          price: 160,
          emoji: "🍚",
        },
        {
          id: 303,
          name: "Butter Naan",
          description: "Soft Indian flatbread topped with butter.",
          price: 50,
          emoji: "🫓",
        },
      ],
    },
  ];

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  const selectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCart([]);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span>🍴</span>
            FoodExpress
          </div>

          <div className="cart-indicator">
            🛒 Cart
            <span>{cart.length}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div>
          <p className="hero-label">FOOD DELIVERY</p>

          <h1>
            Delicious food,
            <br />
            delivered to you.
          </h1>

          <p>
            Choose your favourite restaurant, select your food
            and add it to your cart.
          </p>
        </div>
      </section>

      {/* Restaurants */}
      <main className="container">

        <section className="restaurants-section">

          <div className="section-heading">
            <div>
              <p className="section-label">EXPLORE</p>
              <h2>Choose a Restaurant</h2>
            </div>

            <span>{restaurants.length} restaurants</span>
          </div>

          <div className="restaurant-grid">

            {restaurants.map((restaurant) => (
              <button
                className={`restaurant-card ${
                  selectedRestaurant?.id === restaurant.id
                    ? "active"
                    : ""
                }`}
                key={restaurant.id}
                onClick={() => selectRestaurant(restaurant)}
              >
                <div className="restaurant-icon">
                  {restaurant.id === 1
                    ? "🍕"
                    : restaurant.id === 2
                    ? "🍔"
                    : "🍛"}
                </div>

                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>

                  <p>{restaurant.category}</p>

                  <div className="restaurant-meta">
                    <span>⭐ {restaurant.rating}</span>
                    <span>🕐 {restaurant.delivery}</span>
                  </div>
                </div>

                <span className="arrow">→</span>
              </button>
            ))}

          </div>

        </section>

        {/* Selected Restaurant Menu */}

        {selectedRestaurant && (
          <section className="menu-section">

            <div className="menu-header">

              <div>
                <p className="section-label">MENU</p>

                <h2>{selectedRestaurant.name}</h2>

                <p>
                  {selectedRestaurant.category} • ⭐{" "}
                  {selectedRestaurant.rating}
                </p>
              </div>

              <button
                className="change-btn"
                onClick={() => {
                  setSelectedRestaurant(null);
                  setCart([]);
                }}
              >
                Change Restaurant
              </button>

            </div>

            <div className="menu-list">

              {selectedRestaurant.menu.map((item) => (
                <div className="menu-item" key={item.id}>

                  <div className="food-image">
                    {item.emoji}
                  </div>

                  <div className="food-details">

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <strong>₹{item.price}</strong>

                  </div>

                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                  >
                    + Add
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* Cart */}

        <section className="cart-section">

          <div className="cart-header">
            <div>
              <p className="section-label">YOUR ORDER</p>
              <h2>Shopping Cart</h2>
            </div>

            <span className="cart-count">
              {cart.length} items
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>

              <h3>Your cart is empty</h3>

              <p>
                Select a restaurant and add some delicious food.
              </p>
            </div>
          ) : (
            <>
              <div className="cart-items">

                {cart.map((item, index) => (
                  <div className="cart-item" key={index}>

                    <div className="cart-item-icon">
                      {item.emoji}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>

              <div className="cart-total">

                <div>
                  <span>Total Amount</span>
                  <strong>₹{total}</strong>
                </div>

                <button
                  className="checkout-btn"
                  onClick={() =>
                    alert(
                      `Order placed successfully! Total: ₹${total}`
                    )
                  }
                >
                  Place Order →
                </button>

              </div>
            </>
          )}

        </section>

      </main>

      {/* Footer */}

      <footer>
        <p>FoodExpress • Experiment 04</p>
      </footer>

    </div>
  );
}

export default App;
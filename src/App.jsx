import { useState } from 'react';

const products = [
  { id: 1, name: "Wireless Headphones", price: 2000, oldPrice: 2999, rating: 4.5, category: "Electronics", emoji: "🎧" },
  { id: 2, name: "Sneakers", price: 4000, oldPrice: 3499, rating: 4.8, category: "Fashion", emoji: "👟" },
  { id: 3, name: "Smart Watch", price: 2999, oldPrice: 4999, rating: 4.6, category: "Electronics", emoji: "⌚" },
  { id: 4, name: "Sunglasses", price: 999, oldPrice: 1999, rating: 4.3, category: "Fashion", emoji: "🕶️" },
  { id: 5, name: "Coffee Mug", price: 499, oldPrice: 799, rating: 4.7, category: "Home", emoji: "☕" },
  { id: 6, name: "Face Serum", price: 899, oldPrice: 1299, rating: 4.4, category: "Beauty", emoji: "✨" },
  { id: 7, name: "Backpack", price: 1299, oldPrice: 1999, rating: 4.6, category: "Fashion", emoji: "🎒" },
  { id: 8, name: "Bluetooth Speaker", price: 1799, oldPrice: 2499, rating: 4.5, category: "Electronics", emoji: "🔊" },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState("All");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8f8f8', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#111', color: '#fff', flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0 }}>🛒 meesho</h2>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." style={{ padding: 10, width: 260, borderRadius: 8, border: 'none' }} />
        <button onClick={() => setShowCart(true)} style={{ padding: '10px 18px', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>Cart ({cart.length})</button>
      </header>

      {/* CATEGORY */}
      <div style={{ display: 'flex', gap: 10, padding: 20, flexWrap: 'wrap' }}>
        {["All", "Electronics", "Fashion", "Home", "Beauty"].map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', background: category === c ? '#111' : '#e5e5e5', color: category === c ? '#fff' : '#000' }}>{c}</button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, padding: '0 20px 40px' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: 16, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 50 }}>{p.emoji}</div>
            <h3 style={{ margin: '10px 0 5px' }}>{p.name}</h3>
            <p style={{ margin: 0, color: '#666' }}>⭐ {p.rating} | {p.category}</p>
            <p><b>₹{p.price}</b> <s style={{ color: '#999' }}>₹{p.oldPrice}</s></p>
            <button onClick={() => setCart([...cart, p])} style={{ padding: '10px 16px', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* CART */}
      {showCart && (
        <div style={{ position: 'fixed', right: 0, top: 0, width: 320, height: '100%', background: '#fff', padding: 20, boxShadow: '-2px 0 15px rgba(0,0,0,0.2)', overflowY: 'auto' }}>
          <h2>Your Cart</h2>
          <button onClick={() => setShowCart(false)} style={{ marginBottom: 15 }}>Close ✕</button>
          {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <span>{item.emoji} {item.name}</span>
              <span>₹{item.price} <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))}>❌</button></span>
            </div>
          ))}
          <hr />
          <h3>Total: ₹{total}</h3>
          <button style={{ width: '100%', padding: 12, background: '#111', color: '#fff', borderRadius: 8 }}>Checkout</button>
        </div>
      )}

      <footer style={{ textAlign: 'center', padding: 20, background: '#fff' }}>© 2026 ShopKart - Made with React ❤️</footer>
    </div>
  );
}
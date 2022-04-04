export default function CartItems({ cartData }) {
  if (!cartData) return null;
  return cartData.map((item) => <div key={item.id}>{item.name}</div>);
}

import MenuItem from "./MenuItem";

export default function MenuItems({ data }) {
  return data.map((item) => <MenuItem {...item} />);
}

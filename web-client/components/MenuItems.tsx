import MenuItem from "./MenuItem";
import { ModelMenuItem } from "./MenuItem";

export default function MenuItems({ data }: ModelMenuItem[]) {
  if (!data) return null;
  console.log(data);
  // return data.map((item: ModelMenuItem) => (
  //   <MenuItem key={item.id} {...item} />
  // ));
}

import MenuItem from "./MenuItem";
import { ModelMenuItem } from "./MenuItem";

interface MenuItemsInterface {
  data: ModelMenuItem[];
}
export default function MenuItems({ data }: MenuItemsInterface) {
  if (!data) return null;
  console.log(data);
  return data.map((item: ModelMenuItem) => (
    <MenuItem key={item.id} {...item} />
  ));
}

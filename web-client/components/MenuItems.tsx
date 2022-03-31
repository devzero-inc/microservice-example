import MenuItem from "./MenuItem";
import { ModelMenuItem } from "./MenuItem";

export default function MenuItems({ data }: ModelMenuItem[]) {
  return data.map((item: ModelMenuItem) => (
    <MenuItem key={item.id} {...item} />
  ));
}

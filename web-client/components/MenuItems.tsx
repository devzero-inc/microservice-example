import { Dispatch } from "react";
import MenuItem from "./MenuItem";
import { ModelMenuItem } from "./MenuItem";

interface MenuItemsInterface {
  menuData: ModelMenuItem[] | null;
  setCartData: Dispatch<any>;
}
export default function MenuItems({
  menuData,
  setCartData,
}: MenuItemsInterface) {
  if (!menuData) return null;

  const menuItems = menuData.map((item: ModelMenuItem) => (
    <MenuItem key={item.id} {...item} setCartData={setCartData} />
  ));
  return <>{menuItems}</>;
}

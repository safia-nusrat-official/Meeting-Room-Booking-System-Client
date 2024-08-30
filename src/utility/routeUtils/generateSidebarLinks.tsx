import { NavLink } from "react-router-dom";
import { TSidebarLink, TUserPath } from "../../types/global.types";

export function generateSideBarLinks(
  items: TUserPath[],
  role: "admin" | "user"
) {
  const sidebarItems = items.reduce((acc: TSidebarLink[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/${role}/${item.path ?? ""}`}>{item.name}</NavLink>
        ),
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);

  return sidebarItems;
}

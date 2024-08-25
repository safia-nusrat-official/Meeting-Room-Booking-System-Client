import { TRoute, TUserPath } from "../../types/global.types";

export function generateRoutes(items: TUserPath[]) {
    const routes =
      items &&
      items.reduce((acc: TRoute[], item) => {
        if (item.index) {
          acc.push({
            element: item.element,
            index: item.index,
          });
        }
        if (item.element && item.path) {
          acc.push({
            path: item.path,
            element: item.element,
          });
        }
        if (item.children) {
          item.children.forEach((child) =>
            acc.push({
              path: child.path,
              element: child.element,
            })
          );
        }
        return acc;
      }, []);
  
    return routes;
  }
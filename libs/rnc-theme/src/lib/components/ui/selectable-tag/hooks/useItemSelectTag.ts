import { useCallback, useState } from "react";

export type ItemSelectTag = {
  id: number;
  name: string;
  selected: boolean;
};

export const useItemSelectTag = (itemInit: ItemSelectTag[]) => {
  const [items, setItems] = useState(itemInit);

  const toggleItems = useCallback((id: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
    });
  }, []);

  return {
    items,
    toggleItems,
  };
};

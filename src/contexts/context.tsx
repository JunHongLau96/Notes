import React, {createContext, useState, useContext, ReactNode} from 'react';

interface DataItem {
  title: string;
  data: string[];
}

interface AppContextType {
  data: DataItem[];
  index: number;
  add: (title: string, item: string) => void;
  deleteAll: () => void;
  changeIndex: (index: number) => void;
}

const initialData: DataItem[] = [];
const initialIndex: number = 0;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [data, setData] = useState<DataItem[]>(initialData); //initialize value
  const [index, setIndex] = useState<number>(initialIndex); //initialize value

  const add = (title: string, item: string) => {
    setData(prevData => {
      const categoryIndex = prevData.findIndex(
        category => category.title === title,
      );
      if (categoryIndex !== -1) {
        // Add item to the existing category if there is category with same name currently
        const updatedCategory = {
          ...prevData[categoryIndex],
          data: [...prevData[categoryIndex].data, item], //add new data to the category
        };
        return [
          ...prevData.slice(0, categoryIndex), //add new data dynamically
          updatedCategory,
          ...prevData.slice(categoryIndex + 1),
        ];
      } else {
        // Create a new category if it doesn't exist
        return [...prevData, {title, data: [item]}];
      }
    });
  };

  const deleteAll = () => setData([]); //delete all data in context

  const changeIndex = (newIndex: number) => {
    setIndex(newIndex); //set index for current page
  };

  return (
    <AppContext.Provider value={{data, index, add, deleteAll, changeIndex}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext Error');
  }
  return context;
};

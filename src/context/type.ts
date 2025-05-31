import React from 'react';
import { IcategoryForm } from '../features/categorys/types/types';
export interface Category {
  id: string;
  name: string;
}
export type CountContextType = {
  idCatagory: Category | undefined;
  setIdCatagory: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | undefined>
  >;
};

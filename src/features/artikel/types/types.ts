import { z } from 'zod';
import { SchemaZod } from '../schemas/schemaZod';

export type IArtikelForm = z.infer<typeof SchemaZod>;

export type IuseArtikelProps = {
  onSuccess: (data: IreponsArtikelSukses) => void;
};

export type IreponsArtikelSukses = {
  title: string;
  content: string;
};
export type IuseArtikelPropsUpdate = {
  onSuccess: (data: IFormArtikelValues) => void;
};

export type IFormArtikelValues = {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  imageUrl: string;
};
export type IuseImgProps = {
  onSuccess: (data: imageUrlRespon) => void;
};

export type imageUrlRespon = {
  imageUrl: string;
};

// pegination
export type TypePropsPegination = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

// dammy data fetch
export type IArtikel = {
  id: string;
  title: string;
  imageUrl: string;
  category: { name: string };
  createdAt: string;
};

// type params
export type IstateTable = {
  title?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  select?: string;
  // openAddModal?: boolean;
};

export type DialogArtikelProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  handleSuksesModelComfrime?: () => void;
};

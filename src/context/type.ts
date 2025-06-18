export interface IDgetcontext {
  id: string;
}
export interface IOpenModel {
  task: boolean;
  project: boolean;
  logout: boolean;
}
export type CountContextType = {
  id: IDgetcontext | null;
  setId: React.Dispatch<React.SetStateAction<IDgetcontext | null>>;
  open: IOpenModel;
  setOpen: React.Dispatch<React.SetStateAction<IOpenModel>>;
};

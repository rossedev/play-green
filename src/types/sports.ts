export interface Sport {
  idSport: string;
  strSport: string;
  strFormat: string;
  strSportThumb: string;
  strSportIconGreen: string;
  strSportDescription: string;
}

export type TType = "accept" | "reject";

export type TRecords = {
  userId: string;
  sportId: string;
  like: null | boolean;
  id?: string;
};

export interface SportsContextProps {
  sports: Sport[];
  handleChangeSports: (newSports: Sport[]) => void;
  isPending: boolean;
}

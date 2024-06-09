"use client";

import { getRecords } from "@/firebase/firestore/records";
import { Sport, SportsContextProps } from "@/types/sports";
import { fetchSports } from "@/utils/api";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const SportsContext = createContext<SportsContextProps | undefined>(
  undefined
);

export const SportsProvider = ({ children }: { children: ReactNode }) => {
  const [userState] = useContext<any>(UserContext);
  const [isPending, startTransition] = useTransition();
  const [sports, setSports] = useState<Sport[]>([]);

  const loadSports = useCallback(async () => {
    if (!userState.uid) {
      return;
    }

    try {
      const sportsData: any = [];
      const sportsSaved = localStorage.getItem("sports");

      if (sportsSaved) {
        sportsData.push(JSON.parse(sportsSaved));
      } else {
        const aux = await fetchSports();
        const recordsList = await getRecords(userState.uid);

        if (recordsList.length <= 0 && !!aux) {
          localStorage.setItem("sports", JSON.stringify(aux.sports));
          sportsData.push(aux.sports);
        } else {
          const filterSports = aux.sports.filter((sport: Sport) =>
            recordsList.every((record) => sport.idSport !== record.sportId)
          );

          localStorage.setItem("sports", JSON.stringify(filterSports));
          sportsData.push(filterSports);
        }
      }

      setSports(sportsData?.[0]);
    } catch (error: any) {
      toast.error(`An error has occurred: ${error.message}`, {
        autoClose: 2000,
      });
    }
  }, [userState.uid]);

  useEffect(() => {
    startTransition(() => loadSports());
  }, [userState.uid, loadSports]);

  const handleChangeSports = (newSports: Sport[]) => {
    if (Array.isArray(newSports)) {
      localStorage.setItem("sports", JSON.stringify(newSports));
      setSports(newSports);
    }
  };

  return (
    <SportsContext.Provider value={{ isPending, sports, handleChangeSports }}>
      {children}
    </SportsContext.Provider>
  );
};

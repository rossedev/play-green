"use client";

import { HistoryContainer } from "@/styles/History.styled";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getRecords } from "@/firebase/firestore/records";
import Image from "next/image";
import { VscHeartFilled } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "@/context/UserContext";
import Loading from "@/app/components/ui/Loading";
import { Sport, TRecords } from "@/types/sports";
import { fetchSports } from "@/utils/api";

type THistoryCombined = TRecords & { imgSrc: string; strSport: string };

export default function HistoryPage() {
  const [userState] = useContext<any>(UserContext);
  const [isPending, startTransition] = useTransition();
  const [records, setRecords] = useState<TRecords[]>([]);
  const [historyCombined, setHistoryCombined] = useState<THistoryCombined[]>(
    []
  );
  const [sportsList, setSportsList] = useState<Sport[]>([]);

  const fetchData = useCallback(async () => {
    const recordsList = await getRecords(userState.uid);
    const { sports } = await fetchSports();
    setRecords(uniqueValues(recordsList));
    setSportsList(sports);
  }, [userState.uid]);

  const addImageInRecord = useCallback(
    (recordsList: TRecords[]) => {
      const data = [];
      if (!sportsList) {
        return [];
      }

      for (let i = 0; i < recordsList.length; i++) {
        const record = recordsList[i];

        for (let j = 0; j < sportsList.length; j++) {
          const sport = sportsList[j];

          if (record.sportId === sport.idSport) {
            data.push({
              ...record,
              imgSrc: sport.strSportThumb,
              strSport: sport.strSport,
            });
          }
        }
      }

      return data;
    },
    [sportsList]
  );

  useEffect(() => {
    if (userState.uid) {
      startTransition(() => {
        fetchData();
      });
    }
  }, [userState.uid, fetchData]);

  useEffect(() => {
    if (!!sportsList && sportsList.length > 0 && records.length > 0) {
      const withImage = addImageInRecord(records);
      setHistoryCombined(withImage);
    }
  }, [sportsList, records, addImageInRecord]);

  const uniqueValues = (values: TRecords[]) => {
    const uniqueData: TRecords[] = [];
    const seenIds: { [key: string]: boolean } = {};

    for (const item of values) {
      const key = item.userId + item.sportId;
      if (!seenIds[key]) {
        seenIds[key] = true;
        uniqueData.push(item);
      }
    }

    return uniqueData;
  };

  return (
    <HistoryContainer>
      <h2>History</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      {isPending ? (
        <Loading />
      ) : (
        <div className="sub">
          {historyCombined.length <= 0 ? (
            <p className="no-info">There is no inforrmation</p>
          ) : (
            <>
              {historyCombined.map((data) => (
                <div key={data.id} className="items">
                  <div className="img-container">
                    <h2>{data.strSport}</h2>
                    <Image
                      src={data.imgSrc}
                      alt="Sports"
                      width={258}
                      height={77}
                    />
                  </div>
                  <div className="choice-container">
                    {data.like ? (
                      <VscHeartFilled className="accept" />
                    ) : (
                      <IoIosClose className="reject" />
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </HistoryContainer>
  );
}

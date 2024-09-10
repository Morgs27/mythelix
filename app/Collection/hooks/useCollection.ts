import { useState, useRef, Dispatch, SetStateAction } from "react";
import CardInterface from "@/app/_interfaces/Card";

type UseCollectionProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  session: { user: { username: string } };
};

export const useCollection = ({ setLoading, session }: UseCollectionProps) => {
  const [collection, setCollection] = useState<CardInterface[]>([]);
  const [crystals, setCrystals] = useState<number>(0);

  const updateCrystals = async () => {
    // @ts-ignore
    if (!session || !session.user || !session.user.username) {
      setLoading(false);
      return;
    }

    // @ts-ignore
    const response = await fetch("/api/user/" + session.user.username, {
      cache: "no-store",
    });

    const data = await response.json();

    console.log("Updating crystals", data);

    setCrystals(data.returnUser.crystals);
  };

  const handleGetCollection = async (refresh: any) => {
    // @ts-ignore
    if (!session || !session.user || !session.user.username) {
      setLoading(false);
      return;
    }

    // @ts-ignore
    const response = await fetch(
      "/api/cards/getCollection/" + session.user.username,
      { cache: "no-store" }
    );

    const data = await response.json();

    setCollection(data.data);
  };

  return { updateCrystals, handleGetCollection, collection, setCollection,  crystals, 
    setCrystals };
};

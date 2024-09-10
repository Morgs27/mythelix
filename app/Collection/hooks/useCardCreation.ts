import CardTemplateInterface from "@/app/_interfaces/CardTemplate";
import { useState, useRef, Dispatch, SetStateAction } from "react";

type UseCardCreationProps = {
  handleClear: () => any;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleGetCollection: (refresh: any) => Promise<void>;
  setStatus: Dispatch<
    SetStateAction<{
      message: string;
      type: string;
      active: boolean;
    }>
  >;
  session: { user: { username: string } };
  signal: AbortSignal;
};

export const useCardCreation = ({
  handleClear,
  setLoading,
  handleGetCollection,
  setStatus,
  session,
  signal,
}: UseCardCreationProps) => {
  const [creatingCard, setCreatingCard] = useState<boolean>(false);
  const [templateData, setTemplateData] = useState<CardTemplateInterface | {}>(
    {}
  );
  const [createCardData, setCreateCardData] = useState<any>({});

  const handleCreateCard = async () => {
    if (signal) {
      const { signal } = new AbortController();
      const response = await fetch("/api/cards/template", {
        cache: "no-store",
        signal,
      });
      const data = await response.json();
      if (data == undefined || data == null || data == "") {
        console.log("Error Geting Template");
      } else {
        setCreatingCard(true);
        setTemplateData(data.data);
        handleClear();
        setLoading(true);
      }
    }
  };

  const createCard = async () => {
    setLoading(true);

    const response = await fetch("/api/cards/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...createCardData,
        username: session.user.username,
      }),
    });

    const data = await response.json();

    handleGetCollection(false);

    setTimeout(() => {
      setLoading(false);

      setStatus({ message: "Card Created", type: "sucess", active: true });
    }, 500);
  };

  return {
    createCard,
    handleCreateCard,
    createCardData,
    creatingCard,
    templateData,
    setCreatingCard,
    setCreateCardData,
  };
};

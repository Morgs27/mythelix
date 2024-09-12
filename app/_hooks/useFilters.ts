import CardInterface from "@/app/_interfaces/Card";
import { useState, useRef, Dispatch, SetStateAction } from "react";

type UseFiltersProps = {
  collection: CardInterface[];
  setCollection: (collection: any) => any;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const useFilters = ({
  collection,
  setCollection,
  setLoading,
}: UseFiltersProps) => {
  const [typeFilter, setTypeFilter] = useState("");
  const [alterationFilter, setAlterationFilter] = useState("");
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableAlterations, setAvailableAlterations] = useState<string[]>(
    []
  );
  const searchInput = useRef<any>();
  let searchTimeout: any;

  const sorts = [
    "Attack",
    "Defence",
    "Cost",
    "Contribution",
    "Type",
    "Alteration",
  ];

  const updateAvailableFilters = (cards: CardInterface[]) => {
    const types = new Set<string>();
    const alterations = new Set<string>();

    cards.forEach((card) => {
      types.add(card.type);
      alterations.add(card.alteration);
    });

    setAvailableTypes(Array.from(types));
    setAvailableAlterations(Array.from(alterations));
  };

  const sortCollection = () => {
    setCollection((collection: any) => {
      return collection.slice().sort((a: any, b: any) => {
        if (sort == "") {
          const aDate: any = new Date(a.createdAt);
          const bDate: any = new Date(b.createdAt);

          if (sortOrder === "asc") {
            return aDate - bDate;
          } else {
            return bDate - aDate;
          }
        }

        const aValue = a[sort.toLowerCase()];
        const bValue = b[sort.toLowerCase()];

        if (sort == "Type" || sort == "Alteration") {
          if (aValue == "null" && bValue == "null") {
            return 0;
          } else if (aValue == "null") {
            return 1; // Place null values at the end
          } else if (bValue == "null") {
            return -1; // Place null values at the end
          } else {
            return sortOrder === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
        } else {
          if (sortOrder === "asc") {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
      });
    });

    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleClear = () => {
    setSearch("");
    if (searchInput.current) {
      searchInput.current.value = "";
    }
    setAlterationFilter("");
    setTypeFilter("");
    setSort("");
    setSortOrder("desc");

    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleSearch = (e: any) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      setSearch(e.target.value);
      setLoading(false);
    }, 2000);
  };

  return {
    handleClear,
    updateAvailableFilters,
    sortCollection,
    sort,
    typeFilter,
    alterationFilter,
    sortOrder,
    handleSearch,
    searchInput,
    setTypeFilter,
    availableTypes,
    setAlterationFilter,
    availableAlterations,
    setSort,
    setSortOrder,
    search,
    sorts
  };
};

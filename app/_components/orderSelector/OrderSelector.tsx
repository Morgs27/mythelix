import { Dispatch, SetStateAction } from "react";
import {
  Select,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAmountDownAlt,
} from "react-icons/fa";

type OrderSelectorProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSort:  Dispatch<SetStateAction<string>>;
    sort: string;
    sortOrder: string;
    sorts: string[];
    setSortOrder:  Dispatch<SetStateAction<string>>;
};

const OrderSelector = ({setLoading, setSort, sort, sortOrder, sorts, setSortOrder}: OrderSelectorProps) => {
  return (<Select
    className={"fade-in-normal  react-aria-Select"}
    selectedKey={sort}
    onSelectionChange={(selected) => {
      setLoading(true);
      setSort(String(selected));
    }}
  >
    <Button aria-label="Sort">
      <SelectValue>
        {sort == "" ? (
          <>
            Sort By
            {sortOrder == "desc" ? (
              <FaSortAmountDown />
            ) : sortOrder == "asc" ? (
              <FaSortAmountUp />
            ) : (
              <></>
            )}
            {/* <FaSortAmountDownAlt /> */}
          </>
        ) : (
          <>
            {sort}
            {sortOrder == "desc" ? (
              <FaSortAmountDown />
            ) : sortOrder == "asc" ? (
              <FaSortAmountDownAlt />
            ) : (
              <></>
            )}
          </>
        )}
      </SelectValue>
    </Button>
    <Popover>
      <div className={`order-selector ${sort == "" ? "not-active" : ""}`}>
        <div className="order" onClick={(e) => setSortOrder("desc")}>
          <FaSortAmountDown />
        </div>
        <div className="seperator"></div>
        <div className="order" onClick={(e) => setSortOrder("asc")}>
          <FaSortAmountDownAlt />
        </div>
      </div>

      <ListBox>
        {sorts.map((sort) => (
          <ListBoxItem id={sort} key={sort}>
            {sort}
            {/* <img src={`./types/icons/${type}.png`}/> */}
          </ListBoxItem>
        ))}
      </ListBox>
    </Popover>
  </Select>)
};

export default OrderSelector;

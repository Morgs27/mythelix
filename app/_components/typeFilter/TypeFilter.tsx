import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { SetStateAction, Dispatch } from "react";
import types from "@/app/_data/types.json";

type TypeFilterProps = {
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<string>>;
  availableTypes: string[];
};

const TypeFilter = ({
  typeFilter,
  setTypeFilter,
  availableTypes,
}: TypeFilterProps) => {
  return (
    <Select
      className={"fade-in-normal react-aria-Select type-filter"}
      selectedKey={typeFilter}
      onSelectionChange={(selected) => {
        return setTypeFilter(String(selected));
      }}
    >
      <Button aria-label="Filter" className="react-aria-Button">
        <SelectValue>
          {typeFilter == "" ? (
            <>
              Type
              <img
                src={`./types/icons/All Types.png`}
                width={"20px"}
                height={"20px"}
              />
            </>
          ) : (
            <>
              {typeFilter}
              <img
                src={`./types/icons/${typeFilter}.png`}
                width={"20px"}
                height={"20px"}
              />
            </>
          )}
        </SelectValue>
      </Button>
      <Popover>
        <ListBox>
          {types.map((type) => (
            <>
              <ListBoxItem id="All Types" key="All Types">
                <img src={`./types/icons/All Types.png`} />
                All Types
              </ListBoxItem>
              {availableTypes.map((type) => (
                <ListBoxItem id={type} key={type}>
                  <img src={`./types/icons/${type}.png`} />
                  {type}
                </ListBoxItem>
              ))}
            </>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default TypeFilter;

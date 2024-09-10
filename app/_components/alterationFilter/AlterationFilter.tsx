import cardStyles from "@/app/_data/cardStyles";
import {
  Select,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { FaFilter } from "react-icons/fa";

type AlterationFilterProps = {
  setAlterationFilter: any;
  alterationFilter: string;
  availableAlterations: string[];
};

const AlterationFilter = ({
  setAlterationFilter,
  alterationFilter,
  availableAlterations,
}: AlterationFilterProps) => {
  return (
    <Select
      aria-label="select"
      className={"fade-in-normal react-aria-Select"}
      selectedKey={alterationFilter}
      onSelectionChange={(selected) => setAlterationFilter(String(selected))}
    >
      <Button aria-label="Filter">
        <SelectValue aria-label="value">
          {alterationFilter == "" ? (
            <>
              Alteration
              <FaFilter />
            </>
          ) : (
            <>
              {alterationFilter === "null" ? "None" : alterationFilter}
              {alterationFilter == "All Alterations" ||
              alterationFilter == "null" ? (
                <div
                  style={{
                    background: "white",
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              ) : alterationFilter == "Pop Art" ? (
                // @ts-ignore
                <div
                  style={{
                    background: `linear-gradient(45deg, ${cardStyles[0]["Pop.Art"]?.["gradient"][0]}, ${cardStyles[0]["Pop.Art"]?.["gradient"][1]} )
                       `,
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              ) : (
                // @ts-ignore
                <div
                  style={{
                    background: `linear-gradient(45deg, ${cardStyles[0][alterationFilter]["gradient"][0]}, ${cardStyles[0][alterationFilter]["gradient"][1]} )
                       `,
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              )}
            </>
          )}
        </SelectValue>
      </Button>
      <Popover>
        <ListBox>
          <ListBoxItem id="All Alterations" key="All Alterations">
            <div
              style={{
                background: "white",
                width: "15px",
                height: "15px",
                borderRadius: "2px",
              }}
            ></div>
            All Alterations
          </ListBoxItem>
          {availableAlterations.map((alteration) => (
            <ListBoxItem id={alteration} key={alteration}>
              {alteration === "null" ? (
                <div
                  style={{
                    background: "white",
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              ) : alteration === "Pop Art" ? (
                <div
                  style={{
                    background: `linear-gradient(45deg, ${cardStyles[0]["Pop.Art"]?.["gradient"][0]}, ${cardStyles[0]["Pop.Art"]?.["gradient"][1]})`,
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              ) : (
                <div
                  style={{
                    background: `linear-gradient(45deg, ${cardStyles[0][alteration]?.["gradient"][0]}, ${cardStyles[0][alteration]?.["gradient"][1]})`,
                    width: "15px",
                    height: "15px",
                    borderRadius: "2px",
                  }}
                ></div>
              )}
              {alteration === "null" ? "None" : alteration}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default AlterationFilter;

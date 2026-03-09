import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Disount" },
          { value: "with-discount", label: "With-Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(a-z)" },
          { value: "name-desc", label: "Sort by name(z-a)" },
          { value: "regularPrice-asc", label: "Sort by price(low-high)" },
          { value: "regularPrice-desc", label: "Sort by price(high-low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity(low-high)" },
          { value: "maxCapacity-desc", label: "Sort by capacity(high-low)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

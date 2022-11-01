import { asyncComponent } from "@/lib/hack";
import { PropertySet } from "@/lib/mockData";
import Table from "@/ui/table/Table";
import Td from "@/ui/table/Td";
import Th from "@/ui/table/Th";
import PropertyLink from "../link/PropertyLink";

type Props = {
  propertySet: PropertySet,
};

export default asyncComponent(async function PropertyTable(props: Props) {
  const { propertySet } = props;
  return (
    <Table>
      <thead>
        <tr>
          <Th>Property name</Th>
          <Th>Value</Th>
        </tr>
      </thead>
      <tbody>
        {
          Object.values(propertySet).map(property => {
            return (
              <tr key={ property.uuid }>
                <Td>
                  <PropertyLink uuid={property.uuid} />
                </Td>
                <Td>
                  {property.value}
                </Td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
})

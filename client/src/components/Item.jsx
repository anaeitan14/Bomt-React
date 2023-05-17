import DistBtn from "../components/buttons/DistBtn";
import DocsBtn from "../components/buttons/DocsBtn";

const Item = ({ data }) => {
  return (
    <tr id="item-container">
      <td>{data.ProductID}</td>
      <td>{data.ProductName}</td>
      <td>{data.Description}</td>
      <td>{data.BuyMake}</td>
      <td>{data.Manufacturer}</td>
      <td>{data.ManufacturerID}</td>
      <td>
        <DistBtn data={data.Distrobutor}/>
      </td>
      <td>
        <DocsBtn data={data.Documents} />
      </td>
      <td>{data.TreeAvailable ? "Yes" : "No"}</td>
    </tr>
  );
};

export default Item;

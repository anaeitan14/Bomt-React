import DistBtn from "../components/buttons/DistBtn";
import DocsBtn from "../components/buttons/DocsBtn";
import "./Item.css";

const Item = ({ data }) => {
  return (
    <tr>
      <td>{data.ProductID}</td>
      <td>{data.ProductName}</td>
      <td>{data.Description}</td>
      <td>{data.BuyMake}</td>
      <td>{data.Manufacturer}</td>
      <td>{data.ManufacturerID}</td>
      <td>
        <DistBtn data={data.Distrobutor} />
      </td>
      <td>
        <DocsBtn data={data.Document} />
      </td>
      <td>
        {Object.keys(data).length !== 0
          ? data.TreeAvailable
            ? "Yes"
            : "No"
          : null}
      </td>
    </tr>
  );
};

export default Item;

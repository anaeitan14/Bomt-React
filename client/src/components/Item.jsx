import DistBtn from "../components/buttons/DistBtn";
import DocsBtn from "../components/buttons/DocsBtn";

const Item = ({ PN, PNID, Description, MFR, MFRPN, Type, Tree }) => {
  return (
    <tr id="item-container">
      <td>{PN}</td>
      <td>{PNID}</td>
      <td>{Description}</td>
      <td>{Type}</td>
      <td>{MFR}</td>
      <td>{MFRPN}</td>
      <td>
        <DistBtn />
      </td>
      <td>
        <DocsBtn />
      </td>
      <td>{Tree}</td>
    </tr>
  );
};

export default Item;

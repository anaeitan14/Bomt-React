import "./Item.css";
import ModalButton from "../components/ModalButton";

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
        <ModalButton buttonName= "View" buttonTitle="Distributors" buttonActionTitle="Done"/>
      </td>
      <td>
        <ModalButton buttonName="View" buttonTitle="Documents" buttonActionTitle="Done"/>
      </td>
      <td>{Tree}</td>
    </tr>
  );
};

export default Item;

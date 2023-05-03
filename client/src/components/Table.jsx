import Item from "./Item";
import "./Table.css";

const Table = () => {
  return (
    <div id="table-wrapper">
      <table id="styled-table">
        <thead>
          <tr id="row-header">
            <th>PN</th>
            <th>PNID</th>
            <th>Description</th>
            <th>Type</th>
            <th>MFR</th>
            <th>MFR PN</th>
            <th>Dist</th>
            <th>Doc</th>
            <th>Is tree available</th>
          </tr>
        </thead>
        <tbody>
          <Item
            PN="AMD Ryzen 3800x"
            PNID="43-23-123"
            Description="Quad core CPU"
            MFR="AMD"
            MFRPN="R9K9FIE"
            Type="Buy"
            Tree="True"
          />
          <Item
            PN="AMD Ryzen 3800x"
            PNID="43-23-123"
            Description="Quad core CPU"
            MFR="AMD"
            MFRPN="R9K9FIE"
            Type="Buy"
            Tree="True"
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;

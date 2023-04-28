import "./TableHeaders.css";

const TableHeaders = () => {
  return (
    <tr id="row-header">
      <th>PN</th>
      <th>PNID</th>
      <th>Description</th>
      <th>Type</th>
      <th>MFR</th>
      <th>MFR PN</th>
      <th>Dist 1 - 5</th>
      <th>Dist PN 1 - 5</th>
      <th>Doc 1 - 10</th>
      <th>Is tree available</th>
    </tr>
  );
};

export default TableHeaders;

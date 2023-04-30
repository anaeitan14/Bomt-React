import "./TableHeaders.css";

const TableHeaders = () => {
  return (
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
  );
};

export default TableHeaders;

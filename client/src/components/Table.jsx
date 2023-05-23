import Item from "./Item";

const Table = ({ data }) => {
  console.log(data);
  return (
    <div id="table-wrapper">
      <table className="table table-striped table-hover table-bordered">
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
          <Item data={data} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;

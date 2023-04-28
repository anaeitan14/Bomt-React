import "./Item.css";

const Item = () => {
  return (
    <tr id="item-container">
      <td>Screw number 45</td>
      <td>PNID</td>
      <td>Description</td>
      <td>
        <select>
          <option>Buy</option>
          <option>Make</option>
        </select>
      </td>
      <td>Screw house</td>
      <td>45-80-30-21</td>
      <td>
        <select>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">5</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">5</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">5</option>
          <option value="">6</option>
          <option value="">7</option>
          <option value="">8</option>
          <option value="">9</option>
          <option value="">10</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">True</option>
          <option value="">False</option>
        </select>
      </td>
    </tr>
  );
};

export default Item;

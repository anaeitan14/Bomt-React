import "./Item.css";


const Item = () => {
    return (
        <div id="item-container">
            <p>Screw number 45</p>
            <p>PNID</p>
            <p>Description</p>
            <select>Type
                <option>Buy</option>
                <option>Make</option>
            </select>
            <p>MFR</p>
            <p>MFR PN</p>
            <select>Dist 1-5
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
            </select>
            <select>Dist PN 1-5
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
            </select>
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
            <select>Is tree available
                <option value="">True</option>
                <option value="">False</option>
            </select>
        </div>
    )    
}

export default Item;

const AddItem = () => {
  return (
    <Popup trigger={<button className="button">Add item</button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="content"> Testing popups</div>
          <div className="actions">
            <button className="button" onClick={() => alert("item added")}>
              Add
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

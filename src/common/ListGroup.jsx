import React, { Fragment } from 'react';

const ListGroup = ({
  onItemSelect,
  selectedItem,
  items,
  textProperty,
  valueProperty
}) => {
  const style = { cursor: 'pointer' };
  //return a list of elements
  return (
    <Fragment>
      <ul className='list-group  m-2' style={style}>
        {items.map(item => (
          <li
            key={item[textProperty]}
            // toggle between each item, checks for the selected item
            // filters the selected item
            onClick={e => onItemSelect(item)}
            className={
              item === selectedItem
                ? 'list-group-item active'
                : 'list-group-item'
            }
            style={style}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

//sets a default props value
ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;

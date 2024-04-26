import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ item, deletelist, editing }) => {
  return (
    <div className='grocery-lis'>
      {item.map((items) => {
        const { id, title } = items;
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                className='edit-btn'
                type='button'
                onClick={() => editing(id)}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => deletelist(items.id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;

import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
const getLOcalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('liss'));
  } else {
    return [];
  }
};
function App() {
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState(getLOcalStorage());
  const [editId, setEditId] = useState(null);
  const updatedAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // display..
      // setAlert({ show: true, type: 'danger', msg: 'please add co' });
      updatedAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      // display
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setIsEditing(false);
      setEditId(null);
      updatedAlert(true, 'success', 'value changed');
    } else {
      const newList = { id: new Date().getTime().toString(), title: name };
      setList([...list, newList]);
      updatedAlert(true, 'success', 'item added to the list');
      setName('');
    }
  };
  const clearList = () => {
    setList([]);
    updatedAlert(true, 'danger', 'empty list');
  };
  const deletelist = (id) => {
    updatedAlert(true, 'danger', 'item deleted');
    const del = list.filter((item) => {
      return item.id !== id;
    });
    setList(del);
  };
  const editing = (id) => {
    const edit = list.find((item) => {
      return item.id === id;
    });

    setIsEditing(true);
    setEditId(id);
    setName(edit.title);
  };
  useEffect(() => {
    localStorage.setItem('liss', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form'>
        {alert.show && (
          <Alert
            alert={alert}
            removeAlert={updatedAlert}
            list={list}
            alrt={alert}
          />
        )}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            placeholder='e.g eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit} className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List item={list} deletelist={deletelist} editing={editing} />
          <button className='clear-btn' onClick={clearList}>
            clear item
          </button>
        </div>
      )}
      {console.log(1)}
    </section>
  );
}

export default App;

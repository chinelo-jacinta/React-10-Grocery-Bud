import React, { useEffect } from 'react';

const Alert = ({ alert, removeAlert, list, alrt }) => {
  useEffect(() => {
    const remove = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(remove);
    };
  }, [alrt]);
  const { msg, type } = alert;
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;

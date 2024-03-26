import React from 'react';
import PropTypes from 'prop-types';

function TableTitle({ children }) {
  return <h2 className="table-title">{children}</h2>;
}

TableTitle.propTypes = {
  children: PropTypes.string,
};

export default TableTitle;

import React from 'react';

export default props => {
  const { category } = props;
  return (
    <div style={{ paddingTop: '80px' }}>
      <h1>
        YOU ARE SEEING WHAT'S{' '}
        <span style={{ color: '#FF4501', borderBottom: '3px solid #FF4501' }}>
          {category.toUpperCase()}
        </span>
      </h1>
      <h3>
        Site built by{' '}
        <a
          href="https://github.com/contrecc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span style={{ color: '#FF4501' }}>Colin Contreary</span>
        </a>
      </h3>
      <p>
        Reddit pages formatted like Newser. It uses React, Reactstrap, and
        Express.
      </p>
      <p>
        All data from Reddit. Site not endorsed by or affiliated with Reddit or
        Newser.
      </p>
    </div>
  );
};

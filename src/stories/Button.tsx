import React from 'react';

const Button = () => {
  const handleClick = () => {
    console.log('hh');
  };
  return <button onClick={handleClick}>Button.stories</button>;
};

export default Button;

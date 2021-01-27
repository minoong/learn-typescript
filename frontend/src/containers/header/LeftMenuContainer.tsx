import React from 'react';
import LeftMenu from '../../components/header/LeftMenu';

type LeftMenuContainerProps = {};

const LeftMenuContainer: React.FC<LeftMenuContainerProps> = () => {
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    console.log(1);
    setOpen(false);
  };
  return (
    <>
      <LeftMenu open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
};

export default LeftMenuContainer;

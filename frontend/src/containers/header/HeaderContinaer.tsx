import React from 'react';
import Header from '../../components/header/Header';

type HeaderContinaerProps = {};

const HeaderContinaer: React.FC<HeaderContinaerProps> = () => {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header
        appName="API Department"
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default HeaderContinaer;

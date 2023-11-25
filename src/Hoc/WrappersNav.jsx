import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from '../Components/Navigation/Header';
import Section from '../Components/Navigation/Section';

const WrapperNav = (Component) => {
  const Nav = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Section
          open={open}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <Component />
      </Box>
    );
  };

  return Nav;
};

export default WrapperNav;

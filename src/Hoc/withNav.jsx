import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from '../Components/Navigation/Header';
import Section from '../Components/Navigation/Section';

const withNav = (Component) => {
  function Nav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme: style }) => ({
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      justifyContent: 'flex-end',
      backgroundColor: '#032449',
      padding: style.spacing(0, 1),
      // necessary for content to be below app bar
      ...style.mixins.toolbar,
    }));

    return (
      <Box sx={{ display: 'flex' }}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Section
          open={open}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader sx={{ backgroundColor: 'white' }} />
          <Component />
        </Box>
      </Box>
    );
  }

  return Nav;
};

export default withNav;

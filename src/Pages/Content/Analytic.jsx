import React from 'react';
import { Chart } from 'react-google-charts';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import WrapperNav from '../../Hoc/WrappersNav';

export const data = [
  ['Year', 'Sales', 'Expenses', 'Profit'],
  ['2014', 1000, 400, 200],
  ['2015', 1170, 460, 250],
  ['2016', 660, 1120, 300],
  ['2017', 1030, 540, 350],
];

export const options = {
  chart: {
    title: 'Company Performance',
    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
  },
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  justifyContent: 'flex-end',
  backgroundColor: '#032449',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Analytic = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader sx={{ backgroundColor: 'white' }} />
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </Box>
  );
};

const WrapperAnalytic = WrapperNav(Analytic);

export default WrapperAnalytic;

import React from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import Login from '../Pages/Auth/Login';
import WrapperDocuments from '../Pages/Content/WrapperDocuments';
import WrapperDocumentsID from '../Pages/Content/WrapperDocumentsId';
import WrapperFiles from '../Pages/Content/WrapperFiles';
import WrapperSites from '../Pages/Content/WrapperSites';
import WrapperTypes from '../Pages/Content/WrapperTypes';
import NotFound from '../Components/Navigation/NotFound';
import WrapperCreate from '../Pages/Content/WrapperCreate';

// eslint-disable-next-line import/prefer-default-export
export const routes = [
  {
    path: '/',
    element: WrapperDocuments,
    // eslint-disable-next-line react/jsx-filename-extension
    icon: <TextSnippetIcon />,
  },
  {
    path: '/sites',
    element: WrapperSites,
    icon: <AnalyticsIcon />,
    name: 'Sites',
  },
  {
    path: '/documents',
    element: WrapperDocuments,
    icon: <TextSnippetIcon />,
    name: 'Documents',
  },
  { path: '/documents/:documentID', element: WrapperDocumentsID },
  {
    path: '/types',
    element: WrapperTypes,
    icon: <TextFieldsIcon />,
    name: 'Types',
  },
  {
    path: '/files',
    element: WrapperFiles,
    icon: <InboxIcon />,
    name: 'Files',
  },
  {
    path: '/login',
    element: Login,
    icon: <DoorBackIcon />,
    name: 'Exit',
  },
  { path: '*', element: NotFound },
  { path: '/documents/create', element: WrapperCreate },
];

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import WrapperNav from '../../Hoc/WrappersNav';

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

function Editor() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader sx={{ backgroundColor: 'white' }} />
      <div className="App">
        <h2>Редактирование статей</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p></p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
    </Box>
  );
}

const WrapperEditor = WrapperNav(Editor);

export default WrapperEditor;

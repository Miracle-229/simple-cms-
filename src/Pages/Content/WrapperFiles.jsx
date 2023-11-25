import React from 'react';
import withNav from '../../Hoc/withNav';

function Files() {
  return <div>Files</div>;
}

const WrapperFiles = withNav(Files);

export default WrapperFiles;

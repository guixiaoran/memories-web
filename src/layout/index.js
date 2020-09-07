import React from 'react';
import { HeaderTop, HeaderBottom } from 'components';
// const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


export const Layout = (props) => {
  let content = (<div >
    <HeaderTop />
    <main >
      {props.children}
    </main>
    <HeaderBottom />
  </div>);
  return content;
};


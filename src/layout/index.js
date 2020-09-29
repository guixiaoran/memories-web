import React from 'react';
import { makeStyles } from "@material-ui/core";

import { HeaderTop, HeaderBottom } from 'components';
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles(theme => ({

  iOSPadding: {
    height: iOS ? theme.spacing(2) : 0
  },
}));
export const Layout = (props) => {
  const classes = useStyles();

  let content = (<div >
    <HeaderTop />
    <main style={{
      minHeight: window.innerHeight
    }}>
      {props.children}
    </main>
    <div className={classes.iOSPadding} />
    <HeaderBottom />
  </div>);
  return content;
};


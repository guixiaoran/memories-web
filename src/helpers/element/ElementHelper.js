import { useMediaQuery } from '@material-ui/core';

class ElementHelper {
  isItDesktop() {
    return useMediaQuery('(min-width:600px) and (min-height:600px)');
  }
}

const instance = new ElementHelper();
export default instance;
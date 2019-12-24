import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  spacing: 4,
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;

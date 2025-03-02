import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

function SidebarFooter({ mini }) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by Candle Heaven`}
      </Typography>
    );
  }
  SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
  };

  export default SidebarFooter;
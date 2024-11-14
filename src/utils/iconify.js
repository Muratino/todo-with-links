import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

export function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
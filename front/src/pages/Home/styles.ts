import { SxProps, Theme } from '@mui/material/styles';
import { COLORS, SHADOWS } from '../../styles';
import { BORDER_RADIUS } from '../../theme/theme';

export const homePageStyles: { [key: string]: SxProps<Theme> } = {
  descriptionBox: {
    backgroundColor: COLORS.homeDescriptionBg,
    boxShadow: SHADOWS.light,
    p: 4,
    maxWidth: 900,
    width: '100%',
    borderRadius: BORDER_RADIUS.none,
  },
};

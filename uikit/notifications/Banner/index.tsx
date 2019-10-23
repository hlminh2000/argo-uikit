import * as React from 'react';
import PropTypes from 'prop-types';
import Notification, {
  NOTIFICATION_INTERACTION,
  NOTIFICATION_VARIANTS,
  NOTIFICATION_SIZES,
} from '../Notification';

export const BANNER_VARIANTS = NOTIFICATION_VARIANTS;
export const BANNER_SIZE = NOTIFICATION_SIZES;

function Banner({
  title,
  content,
  variant,
  size,
  ...otherProps
}: {
  title?: React.ReactNode;
  content?: React.ReactNode;
  variant?: keyof typeof BANNER_VARIANTS;
  size?: keyof typeof BANNER_SIZE;
} & React.ComponentProps<typeof Notification>) {
  return (
    <Notification
      noShadow
      interactionType={NOTIFICATION_INTERACTION.NONE}
      title={title}
      content={content}
      variant={variant}
      size={size}
      {...otherProps}
    />
  );
}

export default Banner;

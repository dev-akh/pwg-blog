'use client'

import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { Card, SxProps, Theme } from '@mui/material';

interface BlankCardProps {
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

const BlankCard: React.FC<BlankCardProps> = ({ children, className, sx }) => {

  return (
    <Card
      sx={{
        p: 5,
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 3,
        ...sx
      }}
      className={className}
      variant={'outlined'}
    >
      {children}
    </Card>
  );
};

BlankCard.propTypes = {
  children: PropTypes.node,
};

export default BlankCard;

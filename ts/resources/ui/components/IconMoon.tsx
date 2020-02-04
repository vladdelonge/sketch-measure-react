import React from 'react';
import ThemeContext from './ThemeContext';

interface IconMoonProps {
  style?: any;
}

const IconMoon = (props: IconMoonProps) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <path
          d='M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z'
          style={{
            fill: theme.text.base,
            ...props.style
          }} />
      </svg>
    )}
  </ThemeContext.Consumer>
);

export default IconMoon;

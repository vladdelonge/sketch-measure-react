import React from 'react';
import ThemeContext from './ThemeContext';

interface SidebarHeaderProps {
  text: string;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { text } = props;
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className='c-sidebar__header'
          style={{
            color: theme.text.base,
            background: theme.background.dark,
            boxShadow: `
              0px 1px 0px 0px ${theme.background.lighter} inset,
              0px -1px 0px 0px ${theme.background.lighter} inset
            `
          }}>
          <span>{text}</span>
        </div>
      )}
    </ThemeContext.Consumer>
  )
};

export default SidebarHeader;
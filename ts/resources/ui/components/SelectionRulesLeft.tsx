import React from 'react';
import { createRuleLeftStyles, createDimRightLeftStyles } from '../../utils/selectionStyles';

interface SelectionRulesLeftProps {
  selectionOrigin: any;
  hoverOrigin: any;
  artboardFrame: any;
}

class SelectionRulesLeft extends React.Component<SelectionRulesLeftProps, {}> {
  render() {
    const { selectionOrigin, hoverOrigin, artboardFrame } = this.props;
    return (
      <div
        className='c-selection__rule c-selection__rule--l'
        style={createRuleLeftStyles(selectionOrigin, hoverOrigin)}>
        <div
          className='c-selection__dim'
          style={createDimRightLeftStyles(selectionOrigin, artboardFrame)}>
          {
            // check if selection left origin is right hover right origin
            selectionOrigin.left > hoverOrigin.right
            // if so, display px from selection left to hover right
            ? `${selectionOrigin.left - hoverOrigin.right}px`
            // else, display px from selection left to hover left
            : `${selectionOrigin.left - hoverOrigin.left}px`
          }
        </div>
      </div>
    );
  }
}

export default SelectionRulesLeft;
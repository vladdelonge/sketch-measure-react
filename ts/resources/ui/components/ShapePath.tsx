import React from 'react';
import ShapePathOdd from './ShapePathOdd';
import ShapePathClosed from './ShapePathClosed';

interface ShapePathProps {
  layer: any;
  svgs: any;
  images: any;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
}

const ShapePath = (props: ShapePathProps) => {
  return (
    props.layer.closed
    ? <ShapePathClosed {...props} />
    : <ShapePathOdd {...props} />
  )
};

export default ShapePath;

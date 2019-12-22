const getImage = (images: any, id: any) => {
  return images.find((image: any) => {
    return image.id === id;
  });
};

const createPosition = (x: number, y: number) => {
  return {
    transform: `translateX(${x}px) translateY(${y}px)`
  }
};

const createWidth = (width: number) => {
  return {
    width: `${width}px`
  }
};

const createHeight = (height: number) => {
  return {
    height: `${height}px`
  }
};

const createOpacity = (opacity: number) => {
  return {
    opacity
  }
};

const createBorderRadius = (shapeType: any, points: any) => {
  switch(shapeType) {
    case 'Rectangle':
      const borderRadius: any = [];
      points.forEach((point: any, index: number) => {
        if (index <= 3) {
          borderRadius.push(`${point.cornerRadius}px`);
        }
      });
      return { borderRadius: borderRadius.join(' ') }
      break;
    case 'Oval':
      return { borderRadius: '100%' }
      break;
    default:
      return { borderRadius: 0 }
  };
};

const createBorder = (border: any) => {
  const { thickness, color, position } = border;
  switch(position) {
    case 'Outside':
      return `0 0 0 ${thickness}px ${color}`;
      break;
    case 'Center':
      return `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
      break;
    case 'Inside':
      return `0 0 0 ${thickness}px ${color} inset`;
      break;
    default:
      return `0 0 0 ${thickness / 2}px ${color} inset, 0 0 0 ${thickness / 2}px ${color}`;
  }
};

// NEED TYPES
const createBorders = (borders: any) => {
  const bordersMap: any = [];
  borders.forEach((border: any) => {
    if (border.enabled) {
      bordersMap.unshift(createBorder(border));
    }
  });
  return bordersMap;
};

const createShadow = (shadow: any, inset: boolean) => {
  const { x, y, blur, spread, color } = shadow;
  if (inset) {
    return `${x}px ${y}px ${blur}px ${spread}px ${color} inset`;
  } else {
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }
};

// NEED TYPES
const createShadows = (shadows: any, innerShadows: any) => {
  const shadowsMap: any = [];
  shadows.forEach((shadow: any) => {
    if (shadow.enabled) {
      shadowsMap.push(createShadow(shadow, false));
    }
  });
  innerShadows.forEach((shadow: any) => {
    if (shadow.enabled) {
      shadowsMap.push(createShadow(shadow, true));
    }
  });
  return shadowsMap;
};

const createBordersAndShadows = (borders: any, shadows: any, innerShadows: any) => {
  let combined = null;
  // generate shadows
  const shadowsMap = createShadows(shadows, innerShadows);
  // generate borders
  const bordersMap = createBorders(borders);
  // define combined
  if (shadowsMap.length > 0 && bordersMap.length > 0) {
    combined = `${bordersMap.join()}, ${shadowsMap.join()}`;
  } else if (shadowsMap.length > 0) {
    combined = shadowsMap.join();
  } else if (bordersMap.length > 0) {
    combined = bordersMap.join();
  } else {
    combined = 'none';
  }
  return {
    boxShadow: combined
  }
};

const createGradientFillImage = (images: any, id: any) => {
  const image = getImage(images, id);
  return {
    background: `url(${image.url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
};

// NEED TYPES
const createColorFill = (color: any) => {
  return {
    background: color
  };
};

// NEED TYPES
const createPatternDisplay = (pattern: any) => {
  switch(pattern.patternType) {
    case 'Fill':
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
      break;
    case 'Fit':
      return {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }
      break;
    case 'Stretch':
      return {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }
      break;
    case 'Tile':
      return {
        backgroundRepeat: 'repeat'
      }
      break;
    default:
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
  };
};

// NEED TYPES
const createPatternFill = (pattern: any, images: any) => {
  const fillImageId = pattern.image.id;
  const image = getImage(images, fillImageId);
  const displayStyle = createPatternDisplay(pattern);

  return {
    background: `url(${image.url})`,
    ...displayStyle
  }
};

// NEED TYPES
const createBackground = (fills: any, images: any, id: any) => {
  // get fills that are enabled
  const hasActiveFills = fills.some((fill: any) => fill.enabled);
  // create background if there are active fills
  if (hasActiveFills) {
    // get all active fills
    const activeFills = fills.filter((fill: any) => fill.enabled);
    // return active fill with highest index
    const topFill = activeFills[activeFills.length - 1];
    // create background by fillType
    switch(topFill.fillType) {
      case 'Color':
        return createColorFill(topFill.color);
        break;
      case 'Gradient':
        return createGradientFillImage(images, id);
        break;
      case 'Pattern':
        return createPatternFill(topFill.pattern, images);
        break;
    };
  } else {
    return {
      background: 'none'
    }
  }
};

// NEED TYPES
const createDisplay = (hidden: any) => {
  return hidden ? { display: 'none' } : { display: 'block' };
};

// NEED TYPES
const createLayerStyles = (layer: any, images: any) => {
  const { style, frame, hidden, shapeType, points } = layer;
  const display = createDisplay(hidden);
  const position = createPosition(frame.x, frame.y);
  const width = createWidth(frame.width);
  const height = createHeight(frame.height);
  const borderRadius = createBorderRadius(shapeType, points);
  const opacity = createOpacity(style.opacity);
  const background = createBackground(style.fills, images, style.id);
  const bordersAndShadows = createBordersAndShadows(style.borders, style.shadows, style.innerShadows);

  return {
    ...display,
    ...position,
    ...width,
    ...height,
    ...borderRadius,
    ...opacity,
    ...background,
    ...bordersAndShadows
  }
};

export default createLayerStyles;




// NEED TYPES
// const createLinearGradient = (gradient: any) => {
//   const stops: any = [];
//   const positions = {
//     from: {
//       x: Math.round(Number(gradient.from.x.toFixed(1)) * 2) / 2,
//       y: Math.round(Number(gradient.from.y.toFixed(1)) * 2) / 2
//     },
//     to: {
//       x: Math.round(Number(gradient.to.x.toFixed(1)) * 2) / 2,
//       y: Math.round(Number(gradient.to.y.toFixed(1)) * 2) / 2
//     }
//   }

//   // start directions
//   const topStart = (positions.from.y <= 0 && positions.from.x === 0.5);
//   const bottomStart = (positions.from.y >= 1 && positions.from.x === 0.5);
//   const leftStart = (positions.from.y === 0.5 && positions.from.x <= 0);
//   const rightStart = (positions.from.y === 0.5 && positions.from.x >= 1);
//   const topLeftStart = (positions.from.y <= 0 && positions.from.x <= 0);
//   const topRightStart = (positions.from.y <= 0 && positions.from.x >= 1);
//   const bottomLeftStart = (positions.from.y >= 1 && positions.from.x === 0);
//   const bottomRightStart = (positions.from.y >= 1 && positions.from.x >= 1);
//   // end directions
//   const topLeftEnd = (positions.to.y <= 0 && positions.to.x <= 0);
//   const topRightEnd = (positions.to.y <= 0 && positions.to.x >= 1);
//   const bottomLeftEnd = (positions.to.y >= 1 && positions.to.x <= 0);
//   const bottomRightEnd = (positions.to.y >= 1 && positions.to.x >= 1);

//   let direction = null;
//   if (topLeftStart && bottomRightEnd) {
//     direction = 'to bottom right';
//   } else if (topRightStart && bottomLeftEnd) {
//     direction = 'to bottom left';
//   } else if (bottomLeftStart && topRightEnd) {
//     direction = 'to top right';
//   } else if (bottomRightStart && topLeftEnd) {
//     direction = 'to top left';
//   } else if (topStart) {
//     direction = 'to bottom';
//   } else if (bottomStart) {
//     direction = 'to top';
//   } else if (leftStart) {
//     direction = 'to right';
//   } else if (rightStart) {
//     direction = 'to left';
//   } else {
//     direction = 'to right';
//   }
//   // stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
//   });
//   // final gradient
//   const linearGradient = `linear-gradient(${direction}, ${stops.join()})`;
//   // return gradient
//   return {
//     background: linearGradient
//   };
// }

// NEED TYPES
// const createAngularGradient = (gradient: any) => {
//   const stops: any = [];
//   const firstStop = gradient.stops[0];
//   const lastStop = gradient.stops[gradient.stops.length - 1];
//   const midColor = chroma.mix(firstStop.color, lastStop.color, 0.5);
//   // add first stop
//   stops.push(`${midColor} 0turn`);
//   // add layer stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position).toFixed(2)}turn`);
//   });
//   // add last stop
//   stops.push(`${midColor} 1turn`);
//   // default sketch angular gradient starts at 3:00
//   // default css conic-gradient starts at 12:00
//   // add 0.25turn to translate properly
//   const angularGradient = `conic-gradient(from 0.25turn, ${stops.join()})`;
//   // return gradient
//   return {
//     background: angularGradient
//   };
// };

// NEED TYPES
// const createRadialGradient = (gradient: any, dims: any) => {
//   const stops: any = [];
//   // shape
//   const shape = gradient.aspectRatio === 0 ? 'circle' : 'ellipse';
//   // position
//   const position = {
//     start: {
//       x: dims.width * gradient.from.x.toFixed(2),
//       y: dims.height * gradient.from.y.toFixed(2)
//     },
//     end: {
//       x: dims.width * gradient.to.x.toFixed(2),
//       y: dims.height * gradient.to.y.toFixed(2)
//     }
//   }
//   // radius
//   let length1 = null;
//   if (position.end.y - position.start.y > position.end.x - position.start.x) {
//     length1 = position.end.y - position.start.y;
//   } else {
//     length1 = position.end.x - position.start.x;
//   }
//   // rotation
//   // length if ellipse
//   const length2 = length1 * gradient.aspectRatio;
//   // size
//   const size = shape === 'circle' ? `${length1}px` : `${length1}px ${length2}px`;
//   // stops
//   gradient.stops.map((stop: any) => {
//     stops.push(`${stop.color} ${(stop.position * 100).toFixed(2)}%`);
//   });
//   // final gradient
//   const radialGradient = `radial-gradient(${shape} ${size} at ${position.start.x}px ${position.start.y}px, ${stops.join()})`;
//   // return gradient
//   return {
//     background: radialGradient
//   };
// };

// NEED TYPES
// const createGradientFill = (gradient: any, dims: any) => {
//   switch(gradient.gradientType) {
//     case 'Linear':
//       return createLinearGradient(gradient);
//       break;
//     // does not support gradient rotation
//     case 'Radial':
//       return createRadialGradient(gradient, dims);
//       break;
//     // limited browser support for conic-gradients
//     case 'Angular':
//       return createAngularGradient(gradient);
//       break;
//     default:
//       return;
//   };
// }
import { createBaseLayerStyles, createOpacity } from './layerStyles';

const createTextTransform = (transform: any) => {
  return {
    textTransform: transform
  }
};

const createTextBorders = (borders: any) => {
  if (borders.length > 0 && borders[0].enabled) {
    const { thickness, color } = borders[0];
    return {
      WebkitTextStrokeColor: color,
      WebkitTextStrokeWidth: `${thickness * 2}px`,
      MozTextStrokeColor: color,
      MozTextStrokeWidth: `${thickness * 2}px`
    }
  } else {
    return {
      WebkitTextStrokeWidth: `0px`,
      MozTextStrokeWidth: `0px`
    }
  }
};

const createTextShadow = (shadow: any) => {
  const { x, y, blur, color } = shadow;
  return `${x}px ${y}px ${blur}px ${color}`;
};

const createTextShadows = (shadows: any) => {
  if (shadows.length > 0) {
    const shadowsMap: string[] = [];
    shadows.forEach((shadow: any) => {
      if (shadow.enabled) {
        shadowsMap.push(createTextShadow(shadow));
      }
    });
    return {
      textShadow: shadowsMap.join()
    }
  } else {
    return {
      textShadow: 'none'
    }
  }
};

const createTextDecoration = (textStrikethrough: any, textUnderline: any) => {
  if (textStrikethrough) {
    return {
      textDecoration: 'line-through'
    }
  } else if (textUnderline) {
    return {
      textDecoration: 'underline'
    }
  } else {
    return {
      textDecoration: 'none'
    }
  }
};

const createLetterSpacing = (kerning: number | null) => {
  if (kerning !== null) {
    return {
      letterSpacing: `${kerning}px`
    }
  } else {
    return {
      letterSpacing: 'normal'
    }
  }
};

const createFontFamily = (fontFamily: string) => {
  return {
    fontFamily: fontFamily
  }
};

const createFontWeight = (fontWeight: number) => {
  const sketchRatio = fontWeight / 12;
  const domScale = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weight = domScale[Math.round(sketchRatio * domScale.length)];
  return {
    fontWeight: weight
  }
};

const createFontSize = (fontSize: number) => {
  return {
    fontSize: `${fontSize}px`
  }
};


const createFontStretch = (fontStretch: string) => {
  switch(fontStretch) {
    case 'compressed':
      return {
        fontStretch: 'extra-condensed'
      }
    case 'condensed':
      return {
        fontStretch: 'condensed'
      }
    case 'narrow':
      return {
        fontStretch: 'semi-condensed'
      }
    case 'expanded':
      return {
        fontStretch: 'expanded'
      }
    case 'poser':
      return {
        fontStretch: 'extra-expanded'
      }
    default:
      return {
        fontStretch: 'normal'
      }
  };
};

const createFontColor = (color: string) => {
  return {
    color: color
  }
};

const createLineHeight = (lineHeight: number | null) => {
  if (lineHeight !== null) {
    return {
      lineHeight: `${lineHeight}px`
    }
  } else {
    return {
      lineHeight: 'normal'
    }
  }
};

const createParagraphSpacing = (paragraphSpacing: number, lastChild: boolean) => {
  if (!lastChild) {
    return {
      paddingBottom: `${paragraphSpacing}px`
    }
  } else {
    return {
      paddingBottom: `0px`
    }
  }
};

const createTextAlign = (alignment: any) => {
  return {
    textAlign: alignment
  }
};

const createFontStyle = (fontStyle: string | undefined) => {
  if (fontStyle === 'italic') {
    return {
      fontStyle: 'italic'
    }
  } else {
    return {
      fontStyle: 'normal'
    }
  }
};

const createVerticalAlignment = (alignment: string) => {
  switch(alignment) {
    case 'top':
      return {
        justifyContent: 'flex-start'
      }
    case 'center':
      return {
        justifyContent: 'center'
      }
    case 'bottom':
      return {
        justifyContent: 'flex-end'
      }
    default:
      return {
        justifyContent: 'flex-start'
      }
  }
};

export const textContainerStyles = (layer: any) => {
  const baseStyles = createBaseLayerStyles(layer);
  const verticalAlignment = createVerticalAlignment(layer.style.verticalAlignment);

  return {
    ...baseStyles,
    ...verticalAlignment
  }
};

export const textStyles = (layer: any, lastChild: boolean) => {
  const { style } = layer;
  const textTransform = createTextTransform(style.textTransform);
  const fontFamily = createFontFamily(style.fontFamily);
  const fontSize = createFontSize(style.fontSize);
  const fontWeight = createFontWeight(style.fontWeight);
  const fontStyle = createFontStyle(style.fontStyle);
  const color = createFontColor(style.textColor);
  const lineHeight = createLineHeight(style.lineHeight);
  const opacity = createOpacity(style.opacity);
  const textDecoration = createTextDecoration(style.textStrikethrough, style.textUnderline);
  const fontStretch = createFontStretch(style.fontStretch);
  const paragraphSpacing = createParagraphSpacing(style.paragraphSpacing, lastChild);
  const textAlign = createTextAlign(style.alignment);
  const borders = createTextBorders(style.borders);
  const shadows = createTextShadows(style.shadows);
  const letterSpacing = createLetterSpacing(style.kerning);

  return {
    ...textTransform,
    ...textAlign,
    ...fontFamily,
    ...fontSize,
    ...fontWeight,
    ...fontStretch,
    ...fontStyle,
    ...color,
    ...lineHeight,
    ...opacity,
    ...textDecoration,
    ...paragraphSpacing,
    ...borders,
    ...shadows,
    ...letterSpacing
  }
}
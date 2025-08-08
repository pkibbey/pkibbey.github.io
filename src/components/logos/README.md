# Logo Components

This directory contains React components for all brand logos that were previously stored as SVG assets in `src/assets/`.

## Available Logo Components

All logo components follow the same pattern as `LevelLogo` and accept `React.SVGProps<SVGSVGElement>` as props, allowing for easy customization of size, color, and other SVG properties.

### SVG-based Components
- `DysonLogo` - Dyson brand logo
- `LivePersonLogo` - LivePerson brand logo with gradient support
- `MandsLogo` - M&S (Marks & Spencer) brand logo
- `MaseratiLogo` - Maserati brand logo
- `MetaLogo` - Meta (Facebook) brand logo with gradients
- `MonocleLogo` - Monocle brand logo
- `NokiaLogo` - Nokia brand logo
- `QualcommLogo` - Qualcomm brand logo
- `VizioLogo` - Vizio brand logo

### Image-based Components
- `FpLogo` - FP brand logo (PNG format, uses Next.js Image component)

## Usage

```tsx
import { MetaLogo, QualcommLogo, DysonLogo } from '@/components/logos'

// Use with custom props
<MetaLogo className="w-24 h-8 text-blue-600" />
<QualcommLogo width="100" height="40" fill="currentColor" />

// For the PNG-based logo
<FpLogo width={120} height={60} className="rounded" />
```

## Features

- **Responsive**: All logos scale properly with `width="100%"` and `height="100%"`
- **Themeable**: SVG logos use `fill="currentColor"` by default, making them compatible with CSS color inheritance
- **Accessible**: Each logo includes a proper `<title>` element for screen readers
- **Type-safe**: Full TypeScript support with proper prop types
- **Optimized**: SVG components are lightweight and performant

## Migration from Assets

These components replace the following asset files:
- `src/assets/dyson-logo.svg` → `DysonLogo`
- `src/assets/fp-logo.png` → `FpLogo`
- `src/assets/liveperson-logo.svg` → `LivePersonLogo`
- `src/assets/m-and-s-logo.svg` → `MandsLogo`
- `src/assets/maserati-logo.svg` → `MaseratiLogo`
- `src/assets/meta-logo.svg` → `MetaLogo`
- `src/assets/monocle-logo.svg` → `MonocleLogo`
- `src/assets/nokia-logo.svg` → `NokiaLogo`
- `src/assets/qualcomm-logo.svg` → `QualcommLogo`
- `src/assets/vizio-logo.svg` → `VizioLogo`

The original `level-logo.svg` was already converted to `LevelLogo` component.

import Image from 'next/image'
import fpLogo from './fp-logo.png'

interface FpLogoProps {
  width?: number
  height?: number
  className?: string
}

export default function FpLogo({ width = 240, height = 55, className }: FpLogoProps) {
  return (
    <Image
      src={fpLogo}
      alt="FP Logo"
      width={width}
      height={height}
      className={className}
    />
  )
}

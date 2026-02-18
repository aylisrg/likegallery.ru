'use client'

interface MandalaDecorationProps {
  size?: number
  opacity?: number
  className?: string
  color?: string
}

export function MandalaDecoration({
  size = 400,
  opacity = 0.12,
  className = '',
  color = '#d4af37',
}: MandalaDecorationProps) {
  const r = size / 2
  const cx = r
  const cy = r

  // Helper: point on circle
  const pt = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  })

  // Generate petal path
  const petalPath = (startAngle: number, petalR: number, len: number) => {
    const a = startAngle
    const base1 = pt(a - 10, petalR)
    const base2 = pt(a + 10, petalR)
    const tip = pt(a, petalR + len)
    const ctrl = pt(a, petalR + len * 0.6)
    return `M ${base1.x} ${base1.y} Q ${ctrl.x} ${ctrl.y} ${tip.x} ${tip.y} Q ${ctrl.x} ${ctrl.y} ${base2.x} ${base2.y} Z`
  }

  // Generate N evenly spaced petals
  const petals = (n: number, startR: number, len: number, offset = -90) =>
    Array.from({ length: n }, (_, i) => petalPath(offset + (360 / n) * i, startR, len))

  // Dot ring
  const dotRing = (n: number, radius: number, dotR: number, offset = -90) =>
    Array.from({ length: n }, (_, i) => {
      const p = pt(offset + (360 / n) * i, radius)
      return <circle key={i} cx={p.x} cy={p.y} r={dotR} fill={color} />
    })

  // Diamond ring
  const diamondRing = (n: number, radius: number, size2: number, offset = -90) =>
    Array.from({ length: n }, (_, i) => {
      const angle = offset + (360 / n) * i
      const c = pt(angle, radius)
      return (
        <polygon
          key={i}
          points={`${c.x},${c.y - size2} ${c.x + size2 * 0.5},${c.y} ${c.x},${c.y + size2} ${c.x - size2 * 0.5},${c.y}`}
          fill={color}
          transform={`rotate(${angle + 90}, ${c.x}, ${c.y})`}
        />
      )
    })

  const outerR = r * 0.9
  const midR = r * 0.65
  const innerR = r * 0.4
  const coreR = r * 0.2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer decorative ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={color} strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={outerR * 0.97} fill="none" stroke={color} strokeWidth="0.3" />

      {/* Outer petals x16 */}
      {petals(16, outerR * 0.82, outerR * 0.17).map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.6" />
      ))}

      {/* Diamond ring outer */}
      {diamondRing(16, outerR * 0.78, outerR * 0.035)}

      {/* Dot ring outer */}
      {dotRing(32, outerR * 0.72, outerR * 0.012)}

      {/* Mid ring stroke */}
      <circle cx={cx} cy={cy} r={midR} fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={midR * 1.06} fill="none" stroke={color} strokeWidth="0.4" />

      {/* Mid lotus petals x8 - filled */}
      {petals(8, midR * 0.75, midR * 0.32).map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.5" />
      ))}

      {/* Mid lotus petals x8 - offset outline */}
      {petals(8, midR * 0.75, midR * 0.32, -90 + 22.5).map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
      ))}

      {/* Dot ring mid */}
      {dotRing(16, midR * 0.58, outerR * 0.018)}

      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={color} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={innerR * 1.08} fill="none" stroke={color} strokeWidth="0.4" />

      {/* Inner petals x8 */}
      {petals(8, innerR * 0.7, innerR * 0.32).map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.7" />
      ))}

      {/* Inner petals offset */}
      {petals(8, innerR * 0.65, innerR * 0.28, -90 + 22.5).map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.3" />
      ))}

      {/* Diamond ring inner */}
      {diamondRing(8, innerR * 0.5, innerR * 0.08)}

      {/* Core ring */}
      <circle cx={cx} cy={cy} r={coreR} fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={coreR * 0.8} fill="none" stroke={color} strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={coreR * 0.6} fill="none" stroke={color} strokeWidth="0.5" />

      {/* Core petals x6 */}
      {petals(6, coreR * 0.6, coreR * 0.45).map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.8" />
      ))}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={coreR * 0.18} fill={color} />
      <circle cx={cx} cy={cy} r={coreR * 0.08} fill="none" stroke={color} strokeWidth="1" />

      {/* Geometric 8-pointed star lines (star of ishtar) */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = -90 + i * 45
        const p1 = pt(angle, coreR * 0.6)
        const p2 = pt(angle, outerR * 0.71)
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={color}
            strokeWidth="0.4"
            opacity="0.25"
          />
        )
      })}
    </svg>
  )
}

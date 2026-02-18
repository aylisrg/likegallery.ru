interface ContactLinkProps {
  type: 'whatsapp' | 'telegram' | 'wechat' | 'avito' | 'phone'
  value: string
  message?: string
  label: string
  fullWidth?: boolean
  className?: string
}

const STYLES: Record<ContactLinkProps['type'], string> = {
  whatsapp: 'bg-[#25D366] text-white',
  telegram: 'bg-[#0088cc] text-white',
  wechat: 'bg-[#07c160] text-white',
  avito: 'bg-[#00AAFF] text-white',
  phone: 'bg-white/10 text-parchment border border-parchment/30',
}

const ICONS: Record<ContactLinkProps['type'], string> = {
  whatsapp: 'WA',
  telegram: 'TG',
  wechat: 'WC',
  avito: 'Av',
  phone: '📞',
}

function buildHref(type: ContactLinkProps['type'], value: string, message?: string): string {
  const encoded = message ? encodeURIComponent(message) : ''
  switch (type) {
    case 'whatsapp':
      return `https://wa.me/${value}${encoded ? `?text=${encoded}` : ''}`
    case 'telegram':
      return `https://t.me/${value}${encoded ? `?text=${encoded}` : ''}`
    case 'wechat':
      return `weixin://dl/chat?${value}`
    case 'avito':
      return value
    case 'phone':
      return `tel:${value}`
  }
}

export function ContactLink({ type, value, message, label, fullWidth, className }: ContactLinkProps) {
  if (!value) return null

  const href = buildHref(type, value, message)
  const isExternal = type !== 'phone'

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`
        ${STYLES[type]}
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2
        px-4 py-2.5 rounded-xl font-semibold text-sm
        shadow-md hover:opacity-90 active:scale-95
        transition-all duration-150
        ${className ?? ''}
      `}
    >
      <span className="text-xs font-bold opacity-80">{ICONS[type]}</span>
      {label}
    </a>
  )
}

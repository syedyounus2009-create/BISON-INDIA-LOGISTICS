import * as React from "react"

const Switch = React.forwardRef(({ checked, onCheckedChange, className, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${checked ? 'bg-orange-500' : 'bg-gray-300'} ${className || ''}`}
    ref={ref}
    {...props}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
))
Switch.displayName = "Switch"

export { Switch }
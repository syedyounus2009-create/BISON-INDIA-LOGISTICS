import * as React from "react"
import { X } from "lucide-react"

const ToastProvider = ({ children }) => <>{children}</>

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 gap-2 sm:max-w-[420px] ${className || ''}`} {...props} />
))
ToastViewport.displayName = "ToastViewport"

const Toast = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all ${className || ''}`} {...props}>
    {children}
  </div>
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm font-semibold ${className || ''}`} {...props} />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm opacity-90 ${className || ''}`} {...props} />
))
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={`absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none group-hover:opacity-100 ${className || ''}`} {...props}>
    <X className="h-4 w-4" />
  </button>
))
ToastClose.displayName = "ToastClose"

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose }
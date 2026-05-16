import * as React from "react"

const TabsContext = React.createContext()

const Tabs = ({ children, defaultValue, value, onValueChange }) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue)
  React.useEffect(() => {
    if (value !== undefined) setActiveTab(value)
  }, [value])
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ children, className }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className || ''}`}>
    {children}
  </div>
)

const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab, onValueChange } = React.useContext(TabsContext)
  const isActive = activeTab === value
  return (
    <button
      onClick={() => {
        setActiveTab(value)
        onValueChange?.(value)
      }}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${isActive ? 'bg-white text-orange-600 shadow-sm' : 'hover:bg-gray-50'} ${className || ''}`}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabsContext)
  if (activeTab !== value) return null
  return <div className={`mt-2 ${className || ''}`}>{children}</div>
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
import { Link, Outlet, useLocation } from 'react-router-dom'

const features = [
  { path: 'actions', name: 'Actions & useOptimistic' },
  { path: 'resources', name: 'Resources & use Hook' },
  { path: 'metadata', name: 'Document Metadata' },
  { path: 'assets', name: 'Asset Loading' },
  { path: 'forms', name: 'Form Hooks' },
]

export default function RootLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f5f5f7]">
      {/* 侧边栏 */}
      <div className="h-full w-[220px] bg-white/80 backdrop-blur-xl border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-900">React 19 特性学习</h1>
        </div>
        <nav className="px-4 space-y-1">
          {features.map((feature) => {
            const isActive = location.pathname === `/${feature.path}`
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {feature.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 h-full overflow-auto">
        <div className="h-full p-8">
          <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50">
            <div className="p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

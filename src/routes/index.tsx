import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div className="prose">
          <h2 className="text-gray-900 dark:text-gray-100">欢迎学习 React 19 新特性</h2>
          <p className="text-gray-800 dark:text-gray-200">请从左侧菜单选择要学习的特性。</p>
          <input 
            type="text" 
            className="form-input mt-4 w-full"
            placeholder="示例输入框"
          />
        </div>
      },
      {
        path: 'actions',
        lazy: () => import('../features/actions').then(module => ({
          Component: module.default
        }))
      },
      {
        path: 'resources',
        lazy: () => import('../features/resources').then(module => ({
          Component: module.default
        }))
      },
      {
        path: 'metadata',
        lazy: () => import('../features/metadata').then(module => ({
          Component: module.default
        }))
      },
      {
        path: 'assets',
        lazy: () => import('../features/assets').then(module => ({
          Component: module.default
        }))
      },
      {
        path: 'forms',
        lazy: () => import('../features/forms').then(module => ({
          Component: module.default
        }))
      },
    ],
  },
]) 

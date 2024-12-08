import { Suspense } from 'react'
import { use } from 'react'

// 模拟异步数据获取
async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    title: 'React 19 Resources',
    description: '这是一个使用 use Hook 的示例',
    items: [
      { id: 1, name: '异步数据加载' },
      { id: 2, name: 'Promise 处理' },
      { id: 3, name: '资源管理' },
    ],
  }
}

const dataPromise = fetchData()

function ResourceContent() {
  const data = use(dataPromise)

  return (
    <div>
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p className="mt-2 text-gray-600">{data.description}</p>
      <ul className="mt-4 space-y-2">
        {data.items.map((item) => (
          <li
            key={item.id}
            className="rounded-md border border-gray-200 p-3"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResourcesDemo() {
  return (
    <div className="space-y-4">
      <div className="prose">
        <h2>Resources & use Hook 示例</h2>
        <p>
          此示例展示了如何使用 React 19 的 use Hook
          来处理异步数据和资源加载。
        </p>
      </div>

      <Suspense fallback={<div>加载中...</div>}>
        <ResourceContent />
      </Suspense>
    </div>
  )
}

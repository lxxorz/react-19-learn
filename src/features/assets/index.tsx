import { preload, preinit } from 'react-dom'

interface Asset {
  id: number
  name: string
  type: 'image' | 'stylesheet' | 'script' | 'font'
  url: string
}

export default function AssetsDemo() {
  // 使用 React 19 的资源预加载 API
  preload('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap', {
    as: 'style'
  })
  
  preinit('https://some-analytics.com/script.js', {
    as: 'script'
  })

  const assets: Asset[] = [
    {
      id: 1,
      name: '示例图片',
      type: 'image',
      url: 'https://picsum.photos/400/300',
    },
    {
      id: 2,
      name: '自定义字体',
      type: 'font',
      url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    },
    {
      id: 3, 
      name: '分析脚本',
      type: 'script',
      url: 'https://some-analytics.com/script.js',
    }
  ]

  return (
    <div className="space-y-4">
      <div className="prose">
        <h2>资源加载示例</h2>
        <p>
          这个示例展示了如何使用 React 19 的资源加载 API
          来优化资源加载性能。
        </p>
      </div>

      <div className="grid gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <h3 className="text-lg font-medium">{asset.name}</h3>
            {asset.type === 'image' ? (
              <div className="mt-2 overflow-hidden rounded-md">
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="h-auto w-full"
                  // 使用 preload 预加载图片
                  onLoad={() => preload(asset.url, { as: 'image' })}
                />
              </div>
            ) : (
              <div className="mt-2">
                <code className="rounded bg-gray-100 px-2 py-1">
                  {asset.url}
                </code>
              </div>
            )}
            <p className="mt-2 text-sm text-gray-500">
              类型: {asset.type}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              资源加载优化
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                React 19 提供了多个资源加载 API:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>preload: 预加载关键资源</li>
                <li>preinit: 预初始化脚本</li>
                <li>prefetchDNS: 预解析 DNS</li>
                <li>preconnect: 预连接服务器</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

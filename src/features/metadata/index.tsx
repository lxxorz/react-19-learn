import { useState } from 'react'
import { useDocumentHead } from 'react'

interface MetadataItem {
  id: number
  title: string
  description: string
  keywords: string
  author: string
  socialImage?: string
  ogType?: string
}

function DocumentHead({ metadata }: { metadata: MetadataItem }) {
  useDocumentHead(() => ({
    title: metadata.title,
    metas: [
      { name: 'description', content: metadata.description },
      { name: 'keywords', content: metadata.keywords },
      { name: 'author', content: metadata.author },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:type', content: metadata.ogType || 'website' },
      metadata.socialImage && { 
        property: 'og:image', 
        content: metadata.socialImage 
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: metadata.title },
      { name: 'twitter:description', content: metadata.description },
      metadata.socialImage && {
        name: 'twitter:image',
        content: metadata.socialImage
      }
    ].filter(Boolean)
  }))

  return null
}

const METADATA_EXAMPLES: MetadataItem[] = [
  {
    id: 1,
    title: 'React 19 Metadata',
    description: '学习 React 19 的新 Metadata API',
    keywords: 'React 19, Metadata API, SEO',
    author: 'Your Name',
    socialImage: 'https://example.com/og-image.jpg',
    ogType: 'article'
  },
  {
    id: 2, 
    title: 'SEO 优化',
    description: '使用 Metadata API 优化搜索引擎结果',
    keywords: 'SEO, 搜索引擎优化, React',
    author: 'Your Name',
    socialImage: 'https://example.com/seo-image.jpg',
    ogType: 'website'
  },
  {
    id: 3,
    title: '社交分享',
    description: '配置社交媒体分享信息',
    keywords: '社交媒体, 分享, Meta Tags',
    author: 'Your Name',
    socialImage: 'https://example.com/social-image.jpg',
    ogType: 'website'
  }
]

export default function MetadataDemo() {
  const [currentItem, setCurrentItem] = useState<MetadataItem>(METADATA_EXAMPLES[0])

  return (
    <div className="space-y-4">
      <DocumentHead metadata={currentItem} />

      <div className="prose">
        <h2>Document Metadata 示例</h2>
        <p>
          这个示例展示了如何使用 React 19 的新 Metadata API
          来管理文档元数据。React 会自动管理文档头部的元数据标签。
        </p>
      </div>

      <div className="grid gap-4">
        {METADATA_EXAMPLES.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentItem(item)}
            className={`w-full rounded-lg border p-4 text-left transition-colors ${
              currentItem.id === item.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {item.description}
            </p>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          当前页面元数据
        </h3>
        <div className="mt-3 space-y-2">
          <MetadataDisplay label="标题" value={currentItem.title} />
          <MetadataDisplay label="描述" value={currentItem.description} />
          <MetadataDisplay label="关键词" value={currentItem.keywords} />
          <MetadataDisplay label="作者" value={currentItem.author} />
          {currentItem.socialImage && (
            <MetadataDisplay label="社交图片" value={currentItem.socialImage} />
          )}
          {currentItem.ogType && (
            <MetadataDisplay label="OG 类型" value={currentItem.ogType} />
          )}
        </div>
      </div>
    </div>
  )
}

function MetadataDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-sm font-medium text-gray-500">
        {label}：
      </span>
      <span className="text-sm text-gray-900">
        {value}
      </span>
    </div>
  )
}

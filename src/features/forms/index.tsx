import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

// 定义表单数据类型
interface FormValues {
  name: string
  type: string
}

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white
        hover:bg-blue-600 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
        transition-colors"
    >
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

export default function Forms() {
  // 使用 FormValues 类型替代 FormData
  const [formState, submitAction] = useActionState(
    async (_prevState: FormValues | null, formData: FormData) => {
      const values: FormValues = {
        name: formData.get('name') as string,
        type: formData.get('type') as string
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      return values
    },
    null
  )

  const { pending } = useFormStatus()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          React 19 表单示例
        </h3>
        
        <form action={submitAction} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              名称
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full rounded-lg border-gray-200 bg-gray-50/50 
                focus:border-blue-500 focus:ring-blue-500 focus:bg-white 
                transition-colors"
              placeholder="请输入名称..."
              disabled={pending}
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              类型
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full rounded-lg border-gray-200 bg-gray-50/50 
                focus:border-blue-500 focus:ring-blue-500 focus:bg-white 
                transition-colors"
              disabled={pending}
            >
              <option value="">请选择类型</option>
              <option value="type1">类型 1</option>
              <option value="type2">类型 2</option>
            </select>
          </div>

          <SubmitButton />
        </form>

        {formState && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-900">
              提交的数据:
            </h4>
            <pre className="mt-2 text-sm text-gray-600">
              {JSON.stringify(formState, null, 2)}
            </pre>
            <div className="mt-2 space-y-1">
              <div className="text-sm">
                <span className="font-medium">名称：</span>
                {formState.name}
              </div>
              <div className="text-sm">
                <span className="font-medium">类型：</span>
                {formState.type}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

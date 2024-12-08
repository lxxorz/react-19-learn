import { useOptimistic, useRef, useActionState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

// 模拟服务器操作
async function addTodoAction(prevState: Todo[], formData: FormData) {
  'use server'
  const text = formData.get('text')
  if (typeof text !== 'string') return prevState

  // 模拟网络延迟
  try {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
  
    return [...prevState, newTodo]
  } catch (error) {
    console.error('网络错误', error)
    return prevState
  }

}

export default function ActionsDemo() {
  const [todos, formAction, isPending] = useActionState(addTodoAction, [])
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const text = formData.get('text')
    if (typeof text !== 'string') return

    addOptimisticTodo({
      id: Date.now(),
      text,
      completed: false,
    })

    formRef.current?.reset()
    await formAction(formData)
  }

  return (
    <div className="space-y-6">
      <div className="prose">
        <h2 className="text-2xl font-semibold text-gray-900">Actions & useOptimistic 示例</h2>
        <p className="text-gray-600">
          这个示例展示了如何使用 React 19 的 Actions 和乐观更新特性来处理表单提交。
        </p>
      </div>

      <form
        ref={formRef}
        action={handleSubmit}
        className="flex gap-3"
      >
        <input
          type="text"
          name="text"
          className="flex-1 rounded-lg border-gray-200 bg-gray-50/50 px-4 py-2.5
            focus:border-blue-500 focus:ring-blue-  500 focus:bg-gray-100/80 text-black transition-colors"
          required
          placeholder="添加新任务..."
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600  font-medium hover:from-blue-600 hover:to-blue-700 
            transition-all shadow-sm disabled:opacity-70"
          disabled={isPending}
        >
          {isPending ? '添加中...' : '添加'}
        </button>
      </form>

      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 
              bg-white shadow-sm transition-all hover:shadow-md"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 
                focus:ring-blue-500"
            />
            <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
} 

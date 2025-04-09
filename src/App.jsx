import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function App() {
  const [markdown, setMarkdown] = useState(`# 欢迎使用 Markdown 笔记本！

你可以在左边写笔记，右边实时看到效果。

## 示例代码：

\`\`\`python
print("Hello world")
\`\`\`
`)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 编辑区 */}
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        style={{
          flex: 1,
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '1rem',
          borderRight: '1px solid #ccc',
          resize: 'none'
        }}
      />

      {/* 预览区 */}
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default App

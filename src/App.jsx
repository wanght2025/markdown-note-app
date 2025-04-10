import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState(
    localStorage.getItem('markdown-note') ||
      `# 欢迎使用 Markdown 笔记本！

你可以在左边写笔记，右边实时看到效果。

## 示例代码：

\`\`\`python
print("Hello world")
\`\`\`
`
  )
  const [showQR, setShowQR] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setMarkdown(value)
    localStorage.setItem('markdown-note', value)
  }

  return (
    <div id="root">
      <div className="container">
        <textarea
          value={markdown}
          onChange={handleChange}
          placeholder="写点什么吧..."
        />
        <div className="preview">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>

      {/* 打赏区域 */}
      <div className="donate-container">
        <div className="maid-row" onClick={() => setShowQR(true)}>
          <img src="/maid-cartoon.png" alt="女仆" className="maid-clickable" />
          <div className="donate-text">
            <div>☕ 请作者喝杯咖啡！</div>
            <div className="donate-sub">Buy me a coffee!</div>
          </div>
        </div>

        {showQR && (
          <div className="donate-popup">
            <img src="/wechat-donate.jpg" alt="微信打赏" className="qr-img" />
            <div className="close-center">
              <button onClick={() => setShowQR(false)} className="close-btn">关闭</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

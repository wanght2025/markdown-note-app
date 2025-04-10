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
      {/* 主区域：左右结构 */}
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

      {/* 打赏入口：用女仆图替代按钮 */}
      <div className="donate-container">
        <img
          src="/maid-cartoon.png"
          alt="点击打赏"
          className="maid-clickable"
          onClick={() => setShowQR(true)}
        />

        {showQR && (
          <div className="donate-popup">
            <img src="/wechat-donate.jpg" alt="微信打赏" className="qr-img" />
            <button
              onClick={() => setShowQR(false)}
              className="close-btn"
              style={{ marginTop: '1rem' }}
            >
              关闭
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App


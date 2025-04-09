import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css' // 引入样式

function App() {
  const [markdown, setMarkdown] = useState(localStorage.getItem('markdown-note') || `# 欢迎使用 Markdown 笔记本！

你可以在左边写笔记，右边实时看到效果。

## 示例代码：

\`\`\`python
print("Hello world")
\`\`\`
`)
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

      {/* 打赏区 */}
      <div className="donate-container">
        <button onClick={() => setShowQR(!showQR)}>☕ 请我喝杯咖啡？</button>

        {showQR && (
          <div className="donate-popup">
            <img src="/maid-cartoon.png" alt="女仆图" className="maid-img" />
            <img src="/wechat-donate.jpg" alt="微信打赏" className="qr-img" />
            <p>老板大气💖</p>
            <button onClick={() => setShowQR(false)} className="close-btn">关闭</button>
          </div>
        )}
      </div> {/* ←←← 这里是你缺失的结尾标签 */}

    </div> // 这是最外层 <div id="root"> 的闭合
  )
}

export default App

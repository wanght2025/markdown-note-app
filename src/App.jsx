import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

function App() {
  // 1️⃣ Markdown 内容
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

  // 2️⃣ 控制“打赏弹窗”显示/隐藏
  const [showQR, setShowQR] = useState(false)

  // 3️⃣ 模拟的“打赏排行榜”数据
  const [donations, setDonations] = useState(() => {
    // 从 localStorage 读取（如无则返回空数组）
    const saved = localStorage.getItem('donation-records')
    return saved ? JSON.parse(saved) : []
  })

  // 4️⃣ 处理 Markdown 输入
  const handleChange = (e) => {
    const value = e.target.value
    setMarkdown(value)
    localStorage.setItem('markdown-note', value)
  }

  // 5️⃣ 用户打赏完成后，往排行榜里写入记录
  const handleDonationComplete = () => {
    // 这里你可以改成随机名字 or 让用户输入昵称
    const newDonation = {
      id: Date.now(),
      name: '神秘土豪',
      message: '老板大气！这波打赏功在千秋，建议刻进区块链💖',
    }

    const updatedDonations = [...donations, newDonation]
    setDonations(updatedDonations)
    // 保存到 localStorage，防止刷新后丢失
    localStorage.setItem('donation-records', JSON.stringify(updatedDonations))

    // 关闭打赏弹窗
    setShowQR(false)
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
            <p>感谢支持！</p>
            <button
              onClick={handleDonationComplete}
              className="close-btn"
              style={{ backgroundColor: '#28a745' }}
            >
              打赏完成
            </button>
            <button
              onClick={() => setShowQR(false)}
              className="close-btn"
              style={{ marginLeft: '1rem' }}
            >
              关闭
            </button>
          </div>
        )}
      </div>

      {/* 打赏排行榜 */}
      <div className="donation-board">
        <h3>🥇 打赏排行榜</h3>
        {donations.length === 0 ? (
          <p>还没有人打赏，成为第一个鼓励作者的人吧！</p>
        ) : (
          <ul>
            {donations.map((d, index) => (
              <li key={d.id}>
                {index + 1}. {d.name} - {d.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react';
import { FileText, Eye, Download, Copy, Moon, Sun } from 'lucide-react';

function App() {
  const [markdown, setMarkdown] = useState('# 欢迎使用 Markdown 编辑器\n\n开始输入以体验实时预览效果！');
  const [darkMode, setDarkMode] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert('内容已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请重试');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* 顶部导航栏 */}
      <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold">Markdown 编辑器</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-1"
              title="复制内容"
            >
              <Copy className="w-5 h-5" />
              <span className="text-sm">复制</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-1"
              title="切换主题"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="text-sm">浅色</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="text-sm">深色</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          {/* 编辑区 */}
          <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-semibold">编辑区</h2>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className={`w-full h-[calc(100%-2rem)] p-2 font-mono text-sm resize-none focus:outline-none ${
                darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
              }`}
              placeholder="在此输入 Markdown 内容..."
            />
          </div>

          {/* 预览区 */}
          <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-semibold">预览区</h2>
            </div>
            <div
              className={`prose ${
                darkMode ? 'prose-invert' : ''
              } max-w-none h-[calc(100%-2rem)] overflow-auto`}
            >
              <div className="p-2">
                {markdown.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部提示 */}
      <footer className={`text-center p-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        使用 Markdown 语法编写，左侧编辑，右侧实时预览
      </footer>
    </div>
  );
}

export default App;
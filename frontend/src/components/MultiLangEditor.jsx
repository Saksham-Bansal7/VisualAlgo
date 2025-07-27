import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const languageExtensions = {
  javascript,
  python,
  java,
  cpp
};

export default function MultiLangCodeEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');

  return (
    <div className="p-4 max-w-xl mx-auto">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      <CodeMirror
        
        value={code}
        height="300px"
        extensions={[languageExtensions[language]()]}
        onChange={(value) => setCode(value)}
        theme="dark"
      />
      <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={() => console.log(code)}>Run</button>
    </div>
  );
}

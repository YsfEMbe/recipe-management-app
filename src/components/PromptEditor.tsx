import React, { useState } from 'react'
import { Send } from 'lucide-react'

interface PromptEditorProps {
  initialRewritePrompt: string
  initialMidjourneyPrompt: string
  onRewriteSubmit: (text: string) => void
  onMidjourneySubmit: (text: string) => void
}

export function PromptEditor({
  initialRewritePrompt,
  initialMidjourneyPrompt,
  onRewriteSubmit,
  onMidjourneySubmit,
}: PromptEditorProps) {
  const [rewritePrompt, setRewritePrompt] = useState(initialRewritePrompt)
  const [midjourneyPrompt, setMidjourneyPrompt] = useState(initialMidjourneyPrompt)

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="rewrite-prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Rewrite Prompt
        </label>
        <div className="flex gap-2">
          <textarea
            id="rewrite-prompt"
            value={rewritePrompt}
            onChange={(e) => setRewritePrompt(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter rewrite prompt..."
          />
          <button
            onClick={() => onRewriteSubmit(rewritePrompt)}
            className="self-end p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="midjourney-prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Midjourney Prompt
        </label>
        <div className="flex gap-2">
          <textarea
            id="midjourney-prompt"
            value={midjourneyPrompt}
            onChange={(e) => setMidjourneyPrompt(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter Midjourney prompt..."
          />
          <button
            onClick={() => onMidjourneySubmit(midjourneyPrompt)}
            className="self-end p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

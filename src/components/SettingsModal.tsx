import React, { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialRewritePrompt: string
  initialMidjourneyPrompt: string
  onSave: (rewritePrompt: string, midjourneyPrompt: string) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  initialRewritePrompt,
  initialMidjourneyPrompt,
  onSave,
}: SettingsModalProps) {
  const [rewritePrompt, setRewritePrompt] = useState(initialRewritePrompt)
  const [midjourneyPrompt, setMidjourneyPrompt] = useState(initialMidjourneyPrompt)

  useEffect(() => {
    setRewritePrompt(initialRewritePrompt)
    setMidjourneyPrompt(initialMidjourneyPrompt)
  }, [initialRewritePrompt, initialMidjourneyPrompt])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Prompt Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="rewrite-prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Rewrite Prompt Template
            </label>
            <textarea
              id="rewrite-prompt"
              value={rewritePrompt}
              onChange={(e) => setRewritePrompt(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter rewrite prompt template..."
            />
          </div>

          <div>
            <label htmlFor="midjourney-prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Midjourney Prompt Template
            </label>
            <textarea
              id="midjourney-prompt"
              value={midjourneyPrompt}
              onChange={(e) => setMidjourneyPrompt(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter Midjourney prompt template..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onSave(rewritePrompt, midjourneyPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

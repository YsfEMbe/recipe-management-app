import React, { useState, useEffect } from 'react'
import { RecipeTable } from './components/RecipeTable'
import { SettingsModal } from './components/SettingsModal'
import { Settings } from 'lucide-react'

function App() {
  const [recipes, setRecipes] = useState([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [rewritePrompt, setRewritePrompt] = useState('')
  const [midjourneyPrompt, setMidjourneyPrompt] = useState('')

  useEffect(() => {
    fetchRecipes()
    fetchSettings()
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/recipes')
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:3001/settings')
      const data = await response.json()
      setRewritePrompt(data.rewritePrompt)
      setMidjourneyPrompt(data.midjourneyPrompt)
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleSaveSettings = async (rewritePrompt: string, midjourneyPrompt: string) => {
    try {
      const response = await fetch('http://localhost:3001/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rewritePrompt,
          midjourneyPrompt,
        }),
      })
      const updatedSettings = await response.json()
      setRewritePrompt(updatedSettings.rewritePrompt)
      setMidjourneyPrompt(updatedSettings.midjourneyPrompt)
      setIsSettingsOpen(false)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const handleCopyRecipe = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleGeneratePrompt = (recipe) => {
    const prompt = midjourneyPrompt.replace('{image}', recipe.image)
    navigator.clipboard.writeText(prompt)
  }

  const handleRewrite = async (recipe) => {
    try {
      const response = await fetch(`http://localhost:3001/recipes/${recipe.id}/rewrite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rewrittenText: rewritePrompt,
        }),
      })
      const updatedRecipe = await response.json()
      setRecipes((prev) =>
        prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
      )
    } catch (error) {
      console.error('Error rewriting recipe:', error)
    }
  }

  const handleImageEdit = async (recipe) => {
    // Implement image editing logic
  }

  const handleDelete = async (id) => {
    // Implement delete logic
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Manager</h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipes</h2>
            <RecipeTable
              recipes={recipes}
              onCopyRecipe={handleCopyRecipe}
              onGeneratePrompt={handleGeneratePrompt}
              onRewrite={handleRewrite}
              onImageEdit={handleImageEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          initialRewritePrompt={rewritePrompt}
          initialMidjourneyPrompt={midjourneyPrompt}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  )
}

export default App

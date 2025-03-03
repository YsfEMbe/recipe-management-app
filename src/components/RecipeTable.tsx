import React from 'react'
import { Clipboard, Pencil, Image, Trash2, Plus } from 'lucide-react'

interface Recipe {
  id: number
  image: string
  title: string
  text: string
  rewritten_prompt?: string
}

interface RecipeTableProps {
  recipes: Recipe[]
  onCopyRecipe: (text: string) => void
  onGeneratePrompt: (recipe: Recipe) => void
  onRewrite: (recipe: Recipe) => void
  onImageEdit: (recipe: Recipe) => void
  onDelete: (id: number) => void
}

export function RecipeTable({
  recipes,
  onCopyRecipe,
  onGeneratePrompt,
  onRewrite,
  onImageEdit,
  onDelete,
}: RecipeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-16 w-16 rounded-lg object-cover cursor-pointer hover:opacity-75"
                  onClick={() => onImageEdit(recipe)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recipe.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                <button
                  onClick={() => onCopyRecipe(recipe.text)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  title="Copy Recipe"
                >
                  <Clipboard className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onGeneratePrompt(recipe)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  title="Generate Midjourney Prompt"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRewrite(recipe)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  title="Rewrite Recipe"
                >
                  <Image className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(recipe.id)}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-500"
                  title="Delete Recipe"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

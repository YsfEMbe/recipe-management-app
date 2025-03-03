import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import cors from 'cors'

const app = express()
const PORT = 3001
const recipesPath = path.join(process.cwd(), 'recipes.json')
const settingsPath = path.join(process.cwd(), 'prompt-settings.json')

app.use(cors())
app.use(express.json())

// Helper function to read recipes
async function readRecipes() {
  const data = await fs.readFile(recipesPath, 'utf-8')
  return JSON.parse(data)
}

// Helper function to write recipes
async function writeRecipes(recipes) {
  await fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2))
}

// Helper function to read settings
async function readSettings() {
  const data = await fs.readFile(settingsPath, 'utf-8')
  return JSON.parse(data)
}

// Helper function to write settings
async function writeSettings(settings) {
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2))
}

// Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await readRecipes()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read recipes' })
  }
})

// Get prompt settings
app.get('/settings', async (req, res) => {
  try {
    const settings = await readSettings()
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read settings' })
  }
})

// Update prompt settings
app.put('/settings', async (req, res) => {
  try {
    const { rewritePrompt, midjourneyPrompt } = req.body
    const settings = { rewritePrompt, midjourneyPrompt }
    await writeSettings(settings)
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Update recipe image
app.put('/recipes/:id/image', async (req, res) => {
  try {
    const { id } = req.params
    const { imageUrl } = req.body
    
    const recipes = await readRecipes()
    const recipeIndex = recipes.findIndex(r => r.id === Number(id))
    
    if (recipeIndex === -1) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    
    recipes[recipeIndex].image = imageUrl
    await writeRecipes(recipes)
    
    res.json(recipes[recipeIndex])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe image' })
  }
})

// Rewrite recipe text
app.put('/recipes/:id/rewrite', async (req, res) => {
  try {
    const { id } = req.params
    const { rewrittenText } = req.body
    
    const recipes = await readRecipes()
    const recipeIndex = recipes.findIndex(r => r.id === Number(id))
    
    if (recipeIndex === -1) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    
    recipes[recipeIndex].rewritten_prompt = rewrittenText
    await writeRecipes(recipes)
    
    res.json(recipes[recipeIndex])
  } catch (error) {
    res.status(500).json({ error: 'Failed to rewrite recipe' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

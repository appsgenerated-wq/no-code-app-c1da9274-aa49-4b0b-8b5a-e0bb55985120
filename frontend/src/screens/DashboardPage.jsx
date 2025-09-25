import React, { useEffect, useState, useCallback } from 'react';
import { ClockIcon, UserCircleIcon, PlusIcon, XMarkIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cookTime: 30, image: null, status: 'published' });

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await manifest.from('recipes').find({ 
        include: ['owner'],
        filter: { status: 'published' },
        sort: { createdAt: 'desc' } 
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [manifest]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cookTime: 30, image: null, status: 'published' });
    setIsEditing(null);
    setShowForm(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await manifest.from('recipes').update(isEditing.id, formData);
      } else {
        await manifest.from('recipes').create(formData);
      }
      resetForm();
      loadRecipes();
    } catch (error) {
      console.error('Failed to save recipe:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (recipe) => {
    setIsEditing(recipe);
    setFormData({ ...recipe, image: null }); // Don't pre-fill file input
    setShowForm(true);
  }

  const handleDelete = async (recipeId) => {
    if(window.confirm('Are you sure you want to delete this recipe?')) {
        try {
            await manifest.from('recipes').delete(recipeId);
            loadRecipes();
        } catch(error) {
            console.error('Failed to delete recipe:', error);
            alert('Could not delete recipe. You may not have permission.');
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Admin Panel</a>
              <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Recipes</h1>
          <div className='flex items-center space-x-2'>
             <button onClick={loadRecipes} disabled={loading} className='p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}/>
             </button>
             <button onClick={() => setShowForm(true)} className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                New Recipe
             </button>
          </div>
        </div>

        {/* New/Edit Recipe Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">{isEditing ? 'Edit Recipe' : 'Create New Recipe'}</h2>
                    <button onClick={resetForm} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="title" placeholder="Recipe Title" value={formData.title} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm" required />
                  <textarea name="description" placeholder="Description" value={formData.description} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm h-24" required />
                  <textarea name="ingredients" placeholder="Ingredients (one per line)" value={formData.ingredients} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm h-32" required />
                  <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm h-40" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="prepTime" placeholder="Prep Time (min)" value={formData.prepTime} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm" />
                    <input type="number" name="cookTime" placeholder="Cook Time (min)" value={formData.cookTime} onChange={handleFormChange} className="w-full p-2 border rounded-md shadow-sm" />
                  </div>
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-1'>Recipe Image</label>
                     <input type="file" name="image" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700">{isEditing ? 'Save Changes' : 'Create Recipe'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Recipes List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-medium text-gray-900">No recipes yet!</h3>
            <p className="mt-2 text-gray-500">Be the first to share a delicious recipe with the community.</p>
            <button onClick={() => setShowForm(true)} className="mt-6 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700">Create a Recipe</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                {recipe.image?.card?.url && <img src={recipe.image.card.url} alt={recipe.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                    {recipe.owner.id === user.id && (
                        <div className='flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <button onClick={() => handleEdit(recipe)} className='p-1.5 rounded-md text-gray-500 hover:bg-gray-200'><PencilIcon className='h-4 w-4'/></button>
                            <button onClick={() => handleDelete(recipe.id)} className='p-1.5 rounded-md text-red-500 hover:bg-red-100'><TrashIcon className='h-4 w-4'/></button>
                        </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{recipe.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1.5" />
                        <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center">
                        <UserCircleIcon className="h-4 w-4 mr-1.5" />
                        <span>{recipe.owner?.name || 'Unknown Chef'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

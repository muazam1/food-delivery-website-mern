import { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';

const Menu = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/recipes');
                if (!res.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await res.json();
                setRecipes(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError(err.message + (err.cause ? ` Cause: ${err.cause}` : ''));
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <div className="text-center py-20">Loading menu...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <section className="pt-40 pb-20 bg-pure-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h5 className="text-goldfinger uppercase tracking-[0.2rem] font-bold mb-4">Our Menu</h5>
                    <h2 className="text-5xl md:text-6xl font-bold text-lead">Explore Our Dishes</h2>
                </div>

                {recipes.length === 0 ? (
                    <div className="text-center text-xl text-gray-500">No recipes found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {recipes.map(product => (
                            <MenuCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
export default Menu;

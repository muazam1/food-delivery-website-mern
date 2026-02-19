import { useState, useEffect } from 'react';
import MenuCard from './MenuCard';

const PopularMenu = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch('/api/recipes');
                if (res.ok) {
                    const data = await res.json();
                    // Take only the first 3 items for "Popular" section, or more if needed
                    setRecipes(Array.isArray(data) ? data.slice(0, 3) : []);
                }
            } catch (err) {
                console.error("Error fetching popular menu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <div className="text-center py-20">Loading popular menu...</div>;

    return (
        <section id="popular-menu" className="py-20">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <h5 className="text-goldfinger uppercase tracking-widest font-bold mb-3 text-sm">Our Menu</h5>
                <h2 className="text-4xl md:text-5xl font-bold text-lead mb-16">The Most Popular</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map(product => (
                        <MenuCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularMenu;

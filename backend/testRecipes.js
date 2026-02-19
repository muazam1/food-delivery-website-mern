const testRecipes = async () => {
    try {
        console.log("Testing GET /api/recipes with BAD TOKEN...");
        const res = await fetch('http://localhost:5000/api/recipes', {
            headers: {
                'Authorization': 'Bearer INVALID_TOKEN'
            }
        });
        console.log("Status:", res.status);
        if (res.status === 200) {
            console.log("SUCCESS: Public route ignored bad token.");
            const data = await res.json();
            console.log("Items count:", data.length);
        } else {
            console.log("FAILURE: Route rejected bad token (Status: " + res.status + ")");
            const text = await res.text();
            console.log("Response body:", text);
        }
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
};

testRecipes();

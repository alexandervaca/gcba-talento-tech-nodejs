#!/usr/bin/env node

// Base URL for FakeStore API
const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the FakeStore API
 * @returns {Promise<Array>} Array of products
 */
async function getProducts() {
    console.log('🚀 [getProducts] Function started');
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        console.log('✅ [getProducts] Function completed successfully');
        return products;
    } catch (error) {
        console.error('❌ [getProducts] Function failed:', error.message);
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
}

/**
 * Fetches a specific product by ID from the FakeStore API
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
async function getProductById(id) {
    console.log(`🚀 [getProductById] Function started with ID: ${id}`);
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Product with ID ${id} not found`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //console.log('response: ', response);
        const product = await response.json();
        console.log(`✅ [getProductById] Function completed successfully for ID: ${id}`);
        return product;
    } catch (error) {
        console.error(`❌ [getProductById] Function failed for ID ${id}:`, error.message);
        throw new Error(`Failed to fetch product ${id}: ${error.message}`);
    }
}

/**
 * Creates a new product using the FakeStore API
 * @param {string} title - Product title
 * @param {string} price - Product price
 * @param {string} category - Product category
 * @returns {Promise<Object>} Created product object
 */
async function createProduct(title, price, category) {
    console.log(`🚀 [createProduct] Function started with title: ${title}, price: ${price}, category: ${category}`);
    try {
        const productData = {
            title: title,
            price: parseFloat(price),
            category: category,
            image: 'https://via.placeholder.com/300x300?text=New+Product',
            description: `A new ${category} product: ${title}`
        };

        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newProduct = await response.json();
        console.log(`✅ [createProduct] Function completed successfully for title: ${title}`);
        return newProduct;
    } catch (error) {
        console.error(`❌ [createProduct] Function failed for title: ${title}:`, error.message);
        throw new Error(`Failed to create product: ${error.message}`);
    }
}

/**
 * Deletes a product by ID using the FakeStore API
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Deleted product object
 */
async function deleteProduct(id) {
    console.log(`🚀 [deleteProduct] Function started with ID: ${id}`);
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Product with ID ${id} not found`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const deletedProduct = await response.json();
        console.log(`✅ [deleteProduct] Function completed successfully for ID: ${id}`);
        return deletedProduct;
    } catch (error) {
        console.error(`❌ [deleteProduct] Function failed for ID ${id}:`, error.message);
        throw new Error(`Failed to delete product ${id}: ${error.message}`);
    }
}

/**
 * Displays formatted output for products
 * @param {Array|Object} data - Product(s) to display
 */
function displayOutput(data) {
    console.log('🚀 [displayOutput] Function started');
    if (Array.isArray(data)) {
        if (data.length === 0) {
            console.log('No products found.');
        } else {
            console.table(data);
        }
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
    console.log('✅ [displayOutput] Function completed');
}

/**
 * Displays usage instructions
 */
function showUsage() {
    console.log('🚀 [showUsage] Function started');
    console.log(`
FakeStore API CLI - Usage Examples:

GET all products:
  npm run start GET products

GET specific product:
  npm run start GET products/15

CREATE new product:
  npm run start POST products "T-Shirt-Rex" 300 "remeras"

DELETE product:
  npm run start DELETE products/7

Note: For POST commands, wrap multi-word values in quotes.
    `);
    console.log('✅ [showUsage] Function completed');
}

/**
 * Main function that processes command line arguments and executes API calls
 */
async function main() {
    console.log('🚀 [main] Function started');
    console.log('=' .repeat(50));
    try {
        // Parse command line arguments
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            showUsage();
            return;
        }

        const [method, resource, ...params] = args;

        // Validate method
        if (!['GET', 'POST', 'DELETE'].includes(method)) {
            console.error(`Error: Invalid method '${method}'. Use GET, POST, or DELETE.`);
            showUsage();
            return;
        }

        // Process commands based on method and resource
        switch (method) {
            case 'GET':
                if (resource === 'products') {
                    console.log('Fetching all products...\n');
                    const products = await getProducts();
                    displayOutput(products);
                } else if (resource.startsWith('products/')) {
                    const productId = resource.split('/')[1];
                    if (!productId) {
                        console.error('Error: Product ID is required for GET products/<id>');
                        return;
                    }
                    console.log(`Fetching product with ID ${productId}...\n`);
                    const product = await getProductById(productId);
                    displayOutput(product);
                } else {
                    console.error(`Error: Invalid resource '${resource}'. Use 'products' or 'products/<id>'.`);
                    showUsage();
                }
                break;

            case 'POST':
                if (resource === 'products') {
                    if (params.length < 3) {
                        console.error('Error: POST products requires title, price, and category parameters.');
                        console.log('Usage: npm run start POST products "<title>" <price> "<category>"');
                        process.exit(1);
                    }
                    const [title, price, category] = params;
                    
                    if (isNaN(parseFloat(price))) {
                        console.error('Error: Price must be a valid number.');
                        process.exit(1);
                    }
                    
                    console.log(`Creating new product: ${title} (${price}, ${category})...\n`);
                    const newProduct = await createProduct(title, price, category);
                    displayOutput(newProduct);
                } else {
                    console.error(`Error: Invalid resource '${resource}'. Use 'products' for POST operations.`);
                    showUsage();
                    process.exit(1);
                }
                break;

            case 'DELETE':
                if (resource.startsWith('products/')) {
                    const productId = resource.split('/')[1];
                    if (!productId) {
                        console.error('Error: Product ID is required for DELETE products/<id>');
                        return;
                    }
                    console.log(`Deleting product with ID ${productId}...\n`);
                    const deletedProduct = await deleteProduct(productId);
                    displayOutput(deletedProduct);
                } else {
                    console.error(`Error: Invalid resource '${resource}'. Use 'products/<id>' for DELETE operations.`);
                    showUsage();
                }
                break;
        }
        console.log('\n✅ [main] Function completed successfully');

    } catch (error) {
        console.error(`\n❌ [main] Function failed: ${error.message}`);
        process.exit(1);
    }
}

// Export functions for testing
export { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct, 
    displayOutput, 
    showUsage 
};

// Execute main function
main();


import { jest } from '@jest/globals';

// Mock global fetch
global.fetch = jest.fn();

// Mock console methods to avoid noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn(),
    table: jest.fn()
};

// Import functions after mocking
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct, 
    displayOutput, 
    showUsage 
} from './index.js';

describe('FakeStore API CLI Tests', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        fetch.mockClear();
        console.log.mockClear();
        console.error.mockClear();
        console.table.mockClear();
    });

    describe('getProducts', () => {
        test('should fetch all products successfully', async () => {
            // Arrange
            const mockProducts = [
                { id: 1, title: 'Product 1', price: 10.99 },
                { id: 2, title: 'Product 2', price: 20.99 }
            ];
            
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockProducts)
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act
            const result = await getProducts();

            // Assert
            expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
            expect(mockResponse.json).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
            expect(console.log).toHaveBeenCalledWith('🚀 [getProducts] Function started');
            expect(console.log).toHaveBeenCalledWith('✅ [getProducts] Function completed successfully');
        });

        test('should handle fetch error', async () => {
            // Arrange
            const mockError = new Error('Network error');
            fetch.mockRejectedValue(mockError);

            // Act & Assert
            await expect(getProducts()).rejects.toThrow('Failed to fetch products: Network error');
            expect(console.error).toHaveBeenCalledWith('❌ [getProducts] Function failed:', 'Network error');
        });

        test('should handle HTTP error response', async () => {
            // Arrange
            const mockResponse = {
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act & Assert
            await expect(getProducts()).rejects.toThrow('Failed to fetch products: HTTP error! status: 500');
            expect(console.error).toHaveBeenCalledWith('❌ [getProducts] Function failed:', 'HTTP error! status: 500');
        });
    });

    describe('getProductById', () => {
        test('should fetch product by ID successfully', async () => {
            // Arrange
            const productId = '123';
            const mockProduct = { id: 123, title: 'Test Product', price: 15.99 };
            
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act
            const result = await getProductById(productId);

            // Assert
            expect(fetch).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`);
            expect(mockResponse.json).toHaveBeenCalled();
            expect(result).toEqual(mockProduct);
            expect(console.log).toHaveBeenCalledWith(`🚀 [getProductById] Function started with ID: ${productId}`);
            expect(console.log).toHaveBeenCalledWith(`✅ [getProductById] Function completed successfully for ID: ${productId}`);
        });

        test('should handle 404 error', async () => {
            // Arrange
            const productId = '999';
            const mockResponse = {
                ok: false,
                status: 404,
                statusText: 'Not Found'
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act & Assert
            await expect(getProductById(productId)).rejects.toThrow(`Failed to fetch product ${productId}: Product with ID ${productId} not found`);
            expect(console.error).toHaveBeenCalledWith(`❌ [getProductById] Function failed for ID ${productId}:`, `Product with ID ${productId} not found`);
        });

        test('should handle network error', async () => {
            // Arrange
            const productId = '123';
            const mockError = new Error('Connection failed');
            fetch.mockRejectedValue(mockError);

            // Act & Assert
            await expect(getProductById(productId)).rejects.toThrow('Failed to fetch product 123: Connection failed');
            expect(console.error).toHaveBeenCalledWith(`❌ [getProductById] Function failed for ID ${productId}:`, 'Connection failed');
        });
    });

    describe('createProduct', () => {
        test('should create product successfully', async () => {
            // Arrange
            const title = 'New Product';
            const price = '25.99';
            const category = 'electronics';
            
            const mockNewProduct = { 
                id: 21, 
                title, 
                price: parseFloat(price), 
                category,
                image: 'https://via.placeholder.com/300x300?text=New+Product',
                description: `A new ${category} product: ${title}`
            };
            
            const mockResponse = {
                ok: true,
                status: 201,
                json: jest.fn().mockResolvedValue(mockNewProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act
            const result = await createProduct(title, price, category);

            // Assert
            expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    price: parseFloat(price),
                    category,
                    image: 'https://via.placeholder.com/300x300?text=New+Product',
                    description: `A new ${category} product: ${title}`
                })
            });
            expect(result).toEqual(mockNewProduct);
            expect(console.log).toHaveBeenCalledWith(`🚀 [createProduct] Function started with title: ${title}, price: ${price}, category: ${category}`);
            expect(console.log).toHaveBeenCalledWith(`✅ [createProduct] Function completed successfully for title: ${title}`);
        });

        test('should handle creation error', async () => {
            // Arrange
            const title = 'Test Product';
            const price = '15.99';
            const category = 'test';
            const mockError = new Error('Server error');
            fetch.mockRejectedValue(mockError);

            // Act & Assert
            await expect(createProduct(title, price, category)).rejects.toThrow('Failed to create product: Server error');
            expect(console.error).toHaveBeenCalledWith(`❌ [createProduct] Function failed for title: ${title}:`, 'Server error');
        });

        test('should handle HTTP error response', async () => {
            // Arrange
            const title = 'Test Product';
            const price = '15.99';
            const category = 'test';
            
            const mockResponse = {
                ok: false,
                status: 400,
                statusText: 'Bad Request'
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act & Assert
            await expect(createProduct(title, price, category)).rejects.toThrow('Failed to create product: HTTP error! status: 400');
            expect(console.error).toHaveBeenCalledWith(`❌ [createProduct] Function failed for title: ${title}:`, 'HTTP error! status: 400');
        });
    });

    describe('deleteProduct', () => {
        test('should delete product successfully', async () => {
            // Arrange
            const productId = '456';
            const mockDeletedProduct = { id: 456, title: 'Deleted Product', price: 30.99 };
            
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockDeletedProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act
            const result = await deleteProduct(productId);

            // Assert
            expect(fetch).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`, {
                method: 'DELETE'
            });
            expect(result).toEqual(mockDeletedProduct);
            expect(console.log).toHaveBeenCalledWith(`🚀 [deleteProduct] Function started with ID: ${productId}`);
            expect(console.log).toHaveBeenCalledWith(`✅ [deleteProduct] Function completed successfully for ID: ${productId}`);
        });

        test('should handle 404 error when deleting non-existent product', async () => {
            // Arrange
            const productId = '999';
            const mockResponse = {
                ok: false,
                status: 404,
                statusText: 'Not Found'
            };
            
            fetch.mockResolvedValue(mockResponse);

            // Act & Assert
            await expect(deleteProduct(productId)).rejects.toThrow(`Failed to delete product ${productId}: Product with ID ${productId} not found`);
            expect(console.error).toHaveBeenCalledWith(`❌ [deleteProduct] Function failed for ID ${productId}:`, `Product with ID ${productId} not found`);
        });

        test('should handle network error', async () => {
            // Arrange
            const productId = '456';
            const mockError = new Error('Network timeout');
            fetch.mockRejectedValue(mockError);

            // Act & Assert
            await expect(deleteProduct(productId)).rejects.toThrow('Failed to delete product 456: Network timeout');
            expect(console.error).toHaveBeenCalledWith(`❌ [deleteProduct] Function failed for ID ${productId}:`, 'Network timeout');
        });
    });

    describe('displayOutput', () => {
        test('should display array of products using console.table', () => {
            // Arrange
            const products = [
                { id: 1, title: 'Product 1', price: 10.99 },
                { id: 2, title: 'Product 2', price: 20.99 }
            ];

            // Act
            displayOutput(products);

            // Assert
            expect(console.log).toHaveBeenCalledWith('🚀 [displayOutput] Function started');
            expect(console.table).toHaveBeenCalledWith(products);
            expect(console.log).toHaveBeenCalledWith('✅ [displayOutput] Function completed');
        });

        test('should display empty array message', () => {
            // Arrange
            const emptyProducts = [];

            // Act
            displayOutput(emptyProducts);

            // Assert
            expect(console.log).toHaveBeenCalledWith('🚀 [displayOutput] Function started');
            expect(console.log).toHaveBeenCalledWith('No products found.');
            expect(console.log).toHaveBeenCalledWith('✅ [displayOutput] Function completed');
        });

        test('should display single object using JSON.stringify', () => {
            // Arrange
            const product = { id: 1, title: 'Single Product', price: 15.99 };

            // Act
            displayOutput(product);

            // Assert
            expect(console.log).toHaveBeenCalledWith('🚀 [displayOutput] Function started');
            expect(console.log).toHaveBeenCalledWith(JSON.stringify(product, null, 2));
            expect(console.log).toHaveBeenCalledWith('✅ [displayOutput] Function completed');
        });
    });

    describe('showUsage', () => {
        test('should display usage instructions', () => {
            // Act
            showUsage();

            // Assert
            expect(console.log).toHaveBeenCalledWith('🚀 [showUsage] Function started');
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('FakeStore API CLI - Usage Examples:'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('GET all products:'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('npm run start GET products'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('POST products'));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('DELETE products'));
            expect(console.log).toHaveBeenCalledWith('✅ [showUsage] Function completed');
        });
    });
});

describe('Integration Tests', () => {
    describe('Main function simulation', () => {
        test('should handle GET products command', async () => {
            // Arrange
            const mockProducts = [{ id: 1, title: 'Test Product', price: 10.99 }];
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockProducts)
            };
            
            fetch.mockResolvedValue(mockResponse);
            
            // Mock process.argv
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', 'GET', 'products'];

            try {
                // Act - We would need to import and call main() here
                // For now, we'll test the individual functions that main() calls
                const result = await getProducts();
                
                // Assert
                expect(result).toEqual(mockProducts);
            } finally {
                // Cleanup
                process.argv = originalArgv;
            }
        });

        test('should handle GET single product command', async () => {
            // Arrange
            const mockProduct = { id: 1, title: 'Single Product', price: 15.99 };
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);
            
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', 'GET', 'products/1'];

            try {
                // Act
                const result = await getProductById('1');
                
                // Assert
                expect(result).toEqual(mockProduct);
            } finally {
                process.argv = originalArgv;
            }
        });

        test('should handle POST product command', async () => {
            // Arrange
            const mockNewProduct = { id: 21, title: 'New Product', price: 25.99, category: 'electronics' };
            const mockResponse = {
                ok: true,
                status: 201,
                json: jest.fn().mockResolvedValue(mockNewProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);
            
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', 'POST', 'products', 'New Product', '25.99', 'electronics'];

            try {
                // Act
                const result = await createProduct('New Product', '25.99', 'electronics');
                
                // Assert
                expect(result).toEqual(mockNewProduct);
            } finally {
                process.argv = originalArgv;
            }
        });

        test('should handle DELETE product command', async () => {
            // Arrange
            const mockDeletedProduct = { id: 1, title: 'Deleted Product', price: 30.99 };
            const mockResponse = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue(mockDeletedProduct)
            };
            
            fetch.mockResolvedValue(mockResponse);
            
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', 'DELETE', 'products/1'];

            try {
                // Act
                const result = await deleteProduct('1');
                
                // Assert
                expect(result).toEqual(mockDeletedProduct);
            } finally {
                process.argv = originalArgv;
            }
        });
    });
});

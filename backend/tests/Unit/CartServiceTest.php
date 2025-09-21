<?php

namespace App\Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Service\CartService;
use Doctrine\DBAL\Connection;

class CartServiceTest extends TestCase
{
    private CartService $cartService;
    private Connection $connectionMock;

    protected function setUp(): void
    {
        $this->connectionMock = $this->createMock(Connection::class);
        $this->cartService = new CartService($this->connectionMock);
    }

    /**
     * Test that a new item is created in the cart if it does not already exist.
     */
    public function testAddToCartCreatesNewItemWhenNotExists()
    {
        // Mock the database connection to simulate that the item does not exist in the cart.
        $this->connectionMock
            ->expects($this->once())
            ->method('fetchAssociative')
            ->willReturn(false);

        // Expect that an INSERT statement is executed once.
        $this->connectionMock
            ->expects($this->once())
            ->method('executeStatement')
            ->with(
                'INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
                [1, 123, 2]
            );

        $result = $this->cartService->addToCart(1, 123, 2);
        
        // Assert that the operation was successful and the correct message is returned.
        $this->assertTrue($result['success']);
        $this->assertEquals('Item added to cart', $result['message']);
    }

    /**
     * Test that adding an item with a negative quantity should fail.
     * The application should not allow adding items with negative quantities.
     */
    public function testAddToCartWithNegativeQuantityShouldFail()
    {
        // We expect an exception to be thrown when a negative quantity is used.
        $this->expectException(\InvalidArgumentException::class);

        // This call should throw an exception, so the test will pass if it does.
        $this->cartService->addToCart(1, 123, -5);
    }

    /**
     * Test the calculation of the cart total, including subtotal, tax, and total.
     */
    public function testCalculateCartTotalWithSubtotalAndTax()
    {
        // Define a set of cart items with prices and quantities.
        $cartItems = [
            ['price' => '19.99', 'quantity' => 1], // 19.99
            ['price' => '45.99', 'quantity' => 2]  // 91.98
        ];

        // Subtotal = 19.99 + 91.98 = 111.97
        // Tax (8.5%) = 111.97 * 0.085 = 9.51745
        // Total = 111.97 + 9.51745 = 121.48745

        $result = $this->cartService->calculateCartTotal($cartItems);
        
        // Assert that the calculated subtotal, tax, and total are correct, rounded to 2 decimal places.
        $this->assertEquals(111.97, $result['subtotal']);
        $this->assertEquals(9.52, $result['tax']);
        $this->assertEquals(121.49, $result['total']);
    }

    /**
     * Test that the cart items for a specific user are fetched correctly.
     */
    public function testGetCartItems()
    {
        // Define the expected items to be returned from the database.
        $expectedItems = [
            ['id' => 1, 'product_id' => 123, 'quantity' => 2, 'name' => 'Test Product']
        ];

        // Mock the database connection to return the expected items.
        $this->connectionMock
            ->expects($this->once())
            ->method('fetchAllAssociative')
            ->willReturn($expectedItems);

        $result = $this->cartService->getCartItems(1);
        
        // Assert that the returned items match the expected items.
        $this->assertEquals($expectedItems, $result);
    }

    /**
     * Test that the timestamp of a cart item is updated correctly.
     */
    public function testUpdateCartItemTimestamp()
    {
        // Expect that an UPDATE statement is executed once.
        $this->connectionMock
            ->expects($this->once())
            ->method('executeStatement')
            ->with(
                'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE user_id = ? AND product_id = ?',
                [5, 1, 123]
            )
            ->willReturn(1);

        $result = $this->cartService->updateCartItem(1, 123, 5);
        
        // Assert that the operation was successful.
        $this->assertTrue($result['success']);
    }

    /**
     * Test that the cart is cleared for a specific user.
     */
    public function testClearCart()
    {
        // Expect that a DELETE statement is executed once.
        $this->connectionMock
            ->expects($this->once())
            ->method('executeStatement')
            ->with('DELETE FROM cart WHERE user_id = ?', [1]);

        $this->cartService->clearCart(1);
    }
}
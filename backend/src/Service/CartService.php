<?php

namespace App\Service;

use Doctrine\DBAL\Connection;

class CartService
{
    private const TAX_RATE = 0.085;
    
    public function __construct(
        private Connection $connection
    ) {}

    public function addToCart(int $userId, int $productId, int $quantity): array
    {
        if ($quantity <= 0) {
            throw new \InvalidArgumentException('Quantity must be a positive integer.');
        }

        $existingItem = $this->connection->fetchAssociative(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [$userId, $productId]
        );

        if ($existingItem) {
            $newQuantity = $existingItem['quantity'] + $quantity;
            $this->connection->executeStatement(
                'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ?',
                [$newQuantity, $existingItem['id']]
            );
        } else {
            $this->connection->executeStatement(
                'INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
                [$userId, $productId, $quantity]
            );
        }

        return ['success' => true, 'message' => 'Item added to cart'];
    }

    public function getCartItems(int $userId): array
    {
        return $this->connection->fetchAllAssociative(
            'SELECT c.*, p.name, p.price, p.image_url, p.stock_quantity 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = ? AND p.is_active = 1',
            [$userId]
        );
    }

    public function calculateCartTotal(array $cartItems): array
    {
        $subtotal = 0;
        
        foreach ($cartItems as $item) {
            $subtotal += floatval($item['price']) * intval($item['quantity']);
        }

        $tax = $subtotal * self::TAX_RATE;
        $total = $subtotal + $tax;

        return [
            'subtotal' => round($subtotal, 2),
            'tax' => round($tax, 2),
            'total' => round($total, 2)
        ];
    }

    public function updateCartItem(int $userId, int $productId, int $quantity): array
    {
        if ($quantity <= 0) {
            return $this->removeFromCart($userId, $productId);
        }

        $affected = $this->connection->executeStatement(
            'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE user_id = ? AND product_id = ?',
            [$quantity, $userId, $productId]
        );

        if ($affected === 0) {
            return ['success' => false, 'message' => 'Item not found in cart'];
        }

        return ['success' => true, 'message' => 'Cart updated successfully'];
    }

    public function removeFromCart(int $userId, int $productId): array
    {
        $this->connection->executeStatement(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [$userId, $productId]
        );

        return ['success' => true, 'message' => 'Item removed from cart'];
    }

    public function clearCart(int $userId): void
    {
        $this->connection->executeStatement(
            'DELETE FROM cart WHERE user_id = ?',
            [$userId]
        );
    }
}

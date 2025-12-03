"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/cart-types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  const isProductInCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
          {product.name}
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {product.description}
        </CardDescription>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">
            ¥{product.price.toFixed(2)}
          </div>

          {product.category && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {product.category}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {!isProductInCart ? (
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
            >
              购买
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                disabled
                size="lg"
              >
                在购物车
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  数量: {quantity}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
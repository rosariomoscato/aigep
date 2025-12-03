"use client";

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/cart-context';

export function ShoppingCartList() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            购物车是空的
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleIncrementQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrementQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            购物车 ({items.length} 件商品)
          </CardTitle>
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              清空购物车
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Cart Items List */}
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={item.id} className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1 line-clamp-2">
                        <strong>{item.name}</strong>
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-primary">
                          ¥{item.price.toFixed(2)}
                        </span>

                        {item.category && (
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      增减数量:
                    </span>

                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDecrementQuantity(item.id, item.quantity)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0 rounded-r-none"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-12 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleIncrementQuantity(item.id, item.quantity)}
                        className="h-8 w-8 p-0 rounded-l-none"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      小计: <span className="font-semibold">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Separator between items */}
              {index < items.length - 1 && <Separator />}
            </li>
          ))}
        </ul>

        {/* Cart Summary */}
        <Separator />

        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>总计:</span>
            <span className="text-primary">¥{total.toFixed(2)}</span>
          </div>

          <Button size="lg" className="w-full">
            结账
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
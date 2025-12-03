"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

interface CartIconProps {
  onClick?: () => void;
  showBadge?: boolean;
}

export function CartIcon({ onClick, showBadge = true }: CartIconProps) {
  const { itemCount } = useCart();

  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="relative">
      <ShoppingCart className="h-5 w-5" />
      {showBadge && itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
}
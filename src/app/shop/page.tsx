"use client";

import React, { useState } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { ShoppingCartList } from "@/components/cart/shopping-cart-list";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/cart-types";

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "AI合规认证 - 基础版",
    price: 299.99,
    description: "适用于中小型AI项目的合规认证服务，包含EU AI Act基本要求和伦理评估",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=auto",
    category: "认证服务"
  },
  {
    id: "2",
    name: "AI风险评估工具包",
    price: 199.99,
    description: "专业的AI风险评估工具，包含偏见检测、公平性分析和风险评估模板",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=auto",
    category: "工具包"
  },
  {
    id: "3",
    name: "数据治理指南",
    price: 149.99,
    description: "全面的数据治理实践指南，包含GDPR合规、数据质量管理和最佳实践",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=auto",
    category: "文档"
  },
  {
    id: "4",
    name: "AI系统审计服务",
    price: 599.99,
    description: "专业的AI系统第三方审计服务，提供详细的合规报告和改进建议",
    image: "https://images.unsplash.com/photo-1554224154-260325c05933?w=400&h=400&fit=crop&crop=auto",
    category: "审计服务"
  },
  {
    id: "5",
    name: "机器学习模型解释工具",
    price: 349.99,
    description: "高级ML模型解释工具，支持SHAP、LIME等主流解释性方法",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop&crop=auto",
    category: "工具"
  },
  {
    id: "6",
    name: "企业AI伦理培训课程",
    price: 899.99,
    description: "面向企业的AI伦理培训课程，包含案例研究、实践指南和认证考试",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&crop=auto",
    category: "培训课程"
  }
];

export default function ShopPage() {
  const { items, itemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI治理商店</h1>
        <p className="text-muted-foreground text-lg">
          专业的AI合规工具、认证服务和培训课程
        </p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            产品列表
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            购物车
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {itemCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <ShoppingCartList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
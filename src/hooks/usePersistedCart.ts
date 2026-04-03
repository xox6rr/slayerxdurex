import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface CartItem {
  id: string;
  name: string;
  japaneseName: string;
  breathingStyle: string;
  styleType: "water" | "flame" | "thunder" | "mist" | "glow";
  price: number;
  quantity: number;
  image?: string;
}

export const usePersistedCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const cartItems: CartItem[] = (data || []).map((item) => ({
        id: item.product_id,
        name: item.product_name,
        japaneseName: item.breathing_style || "",
        breathingStyle: item.breathing_style || "",
        styleType: (item.breathing_style?.toLowerCase().includes("water") ? "water" :
                   item.breathing_style?.toLowerCase().includes("flame") ? "flame" :
                   item.breathing_style?.toLowerCase().includes("thunder") ? "thunder" :
                   item.breathing_style?.toLowerCase().includes("glow") ? "glow" : "mist") as CartItem["styleType"],
        price: Number(item.price),
        quantity: item.quantity,
        image: item.product_image || undefined,
      }));

      setItems(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addItem = useCallback(async (newItem: Omit<CartItem, "quantity">) => {
    if (!user) {
      // For non-authenticated users, use local state only
      setItems((prev) => {
        const existingItem = prev.find((item) => item.id === newItem.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...newItem, quantity: 1 }];
      });
      return;
    }

    try {
      // Check if item exists
      const { data: existing } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id)
        .eq("product_id", newItem.id)
        .maybeSingle();

      if (existing) {
        // Update quantity
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("product_id", newItem.id);
      } else {
        // Insert new item
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: newItem.id,
          product_name: newItem.name,
          product_image: newItem.image,
          price: newItem.price,
          quantity: 1,
          breathing_style: newItem.breathingStyle,
        });
      }

      await fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [user, fetchCartItems]);

  const removeItem = useCallback(async (id: string) => {
    if (!user) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    try {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      await fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, [user, fetchCartItems]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    if (!user) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      await supabase
        .from("cart_items")
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("product_id", id);

      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }, [user, fetchCartItems, removeItem]);

  const clearCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }, [user]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoading,
  };
};

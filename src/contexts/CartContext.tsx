import { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from "react";
import { toast } from "sonner";
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

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    if (!user) {
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
    const existingItem = items.find((item) => item.id === newItem.id);
    
    // Optimistic update
    setItems((prev) => {
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });

    toast.success(`${newItem.name} added to cart!`, {
      description: existingItem 
        ? `Now you have ${existingItem.quantity + 1} in your cart`
        : "Click the cart to checkout",
    });

    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id)
        .eq("product_id", newItem.id)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("product_id", newItem.id);
      } else {
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
    } catch (error) {
      console.error("Error syncing cart:", error);
      // Revert on error
      fetchCartItems();
    }
  }, [user, items, fetchCartItems]);

  const removeItem = useCallback(async (id: string) => {
    // Optimistic update
    setItems((prev) => prev.filter((item) => item.id !== id));

    if (!user) return;

    try {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);
    } catch (error) {
      console.error("Error removing from cart:", error);
      fetchCartItems();
    }
  }, [user, fetchCartItems]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    // Optimistic update
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    if (!user) return;

    try {
      await supabase
        .from("cart_items")
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("product_id", id);
    } catch (error) {
      console.error("Error updating cart:", error);
      fetchCartItems();
    }
  }, [user, removeItem, fetchCartItems]);

  const clearCart = useCallback(async () => {
    setItems([]);

    if (!user) return;

    try {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }, [user]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

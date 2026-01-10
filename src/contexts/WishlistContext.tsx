import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  breathingStyle: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const wishlistItems: WishlistItem[] = (data || []).map((item) => ({
        id: item.product_id,
        name: item.product_name,
        price: Number(item.price),
        image: item.product_image || undefined,
        breathingStyle: item.breathing_style || "",
      }));

      setItems(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addItem = useCallback(async (item: WishlistItem) => {
    if (!user) {
      toast.error("Please sign in to add items to your wishlist");
      return;
    }

    try {
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        price: item.price,
        breathing_style: item.breathingStyle,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("Item already in wishlist");
          return;
        }
        throw error;
      }

      await fetchWishlist();
      toast.success(`${item.name} added to wishlist!`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  }, [user, fetchWishlist]);

  const removeItem = useCallback(async (id: string) => {
    if (!user) return;

    try {
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      await fetchWishlist();
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }, [user, fetchWishlist]);

  const isInWishlist = useCallback((id: string) => {
    return items.some((item) => item.id === id);
  }, [items]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

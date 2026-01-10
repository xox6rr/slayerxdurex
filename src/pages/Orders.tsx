import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  processing: { icon: Package, label: "Processing", color: "text-blue-500", bg: "bg-blue-500/10" },
  shipped: { icon: Truck, label: "Shipped", color: "text-purple-500", bg: "bg-purple-500/10" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-green-500", bg: "bg-green-500/10" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "text-red-500", bg: "bg-red-500/10" },
};

const Orders = () => {
  const navigate = useNavigate();
  const { orders, isLoading } = useOrders();
  const { themeInfo } = useHashiraTheme();

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute inset-0 pattern-seigaiha opacity-30" />
      
      {/* Glow effect */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{ background: `hsl(${themeInfo.colors.primary})` }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-brush text-4xl mb-2">注文履歴</h1>
          <p className="text-muted-foreground">Order History</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-2xl p-12 text-center border border-white/10"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-brush text-2xl mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Button
              onClick={() => navigate("/")}
              className="text-white"
              style={{ background: themeInfo.colors.gradient }}
            >
              Browse Products
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 border border-white/10"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                    <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-sm", status.bg, status.color)}>
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-4">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.breathing_style} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Ship to: {order.shipping_name}</p>
                      <p>{order.shipping_city}, {order.shipping_country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-brush text-2xl" style={{ color: `hsl(${themeInfo.colors.primary})` }}>
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

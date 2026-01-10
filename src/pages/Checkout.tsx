import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Truck, Package, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { z } from "zod";

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19),
  cardName: z.string().min(2, "Name on card is required"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().min(3, "CVV is required").max(4),
});

type ShippingData = z.infer<typeof shippingSchema>;
type PaymentData = z.infer<typeof paymentSchema>;

const steps = [
  { id: "shipping", label: "配送先", englishLabel: "Shipping", icon: Truck },
  { id: "payment", label: "お支払い", englishLabel: "Payment", icon: CreditCard },
  { id: "confirmation", label: "確認", englishLabel: "Confirm", icon: Package },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { themeInfo } = useHashiraTheme();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Japan",
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;
  const shippingCost = totalPrice >= 5000 ? 0 : 500;
  const finalTotal = totalPrice + shippingCost;

  const validateShipping = (): boolean => {
    const result = shippingSchema.safeParse(shippingData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePayment = (): boolean => {
    const result = paymentSchema.safeParse(paymentData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (currentStep === 0 && validateShipping()) {
      setCurrentStep(1);
    } else if (currentStep === 1 && validatePayment()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-japanese text-xl text-muted-foreground mb-4">カートは空です</p>
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Button onClick={() => navigate("/")} style={{ background: themeInfo.colors.gradient }}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: themeInfo.colors.gradient }}
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="font-brush text-4xl text-foreground mb-2">全集中!</h1>
          <p className="font-japanese text-xl mb-4" style={{ color: `hsl(${themeInfo.colors.primary})` }}>
            ご注文ありがとうございます
          </p>
          <p className="text-muted-foreground mb-8">
            Thank you for your order! Your breathing styles are on their way.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Order confirmation sent to: {shippingData.email}
          </p>
          <Button onClick={() => navigate("/")} className="text-white" style={{ background: themeInfo.colors.gradient }}>
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display">Back to Shop</span>
          </button>
          <h1 className="font-brush text-2xl">CHECKOUT</h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    background: index <= currentStep ? themeInfo.colors.gradient : "transparent",
                    borderColor: index <= currentStep ? "transparent" : "hsl(var(--border))",
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                    index <= currentStep ? "text-white" : "text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <p className="font-japanese text-xs">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.englishLabel}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-16 md:w-24 h-0.5 mx-2",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                  style={index < currentStep ? { background: themeInfo.colors.gradient } : {}}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-dark rounded-2xl p-6 md:p-8"
                >
                  <h2 className="font-brush text-2xl mb-6">配送先 • SHIPPING</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        className={errors.postalCode ? "border-destructive" : ""}
                      />
                      {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingData.country}
                        onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                        className={errors.country ? "border-destructive" : ""}
                      />
                      {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-dark rounded-2xl p-6 md:p-8"
                >
                  <h2 className="font-brush text-2xl mb-6">お支払い • PAYMENT</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={errors.cardNumber ? "border-destructive" : ""}
                      />
                      {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        className={errors.cardName ? "border-destructive" : ""}
                      />
                      {errors.cardName && <p className="text-xs text-destructive mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={paymentData.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
                            setPaymentData({ ...paymentData, expiry: value });
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={errors.expiry ? "border-destructive" : ""}
                        />
                        {errors.expiry && <p className="text-xs text-destructive mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, "") })}
                          maxLength={4}
                          className={errors.cvv ? "border-destructive" : ""}
                        />
                        {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-dark rounded-2xl p-6 md:p-8"
                >
                  <h2 className="font-brush text-2xl mb-6">確認 • CONFIRMATION</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Summary */}
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display text-sm text-muted-foreground">SHIPPING TO</h3>
                        <button
                          onClick={() => setCurrentStep(0)}
                          className="text-xs text-primary hover:underline"
                          style={{ color: `hsl(${themeInfo.colors.primary})` }}
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-foreground">{shippingData.firstName} {shippingData.lastName}</p>
                      <p className="text-muted-foreground text-sm">{shippingData.address}</p>
                      <p className="text-muted-foreground text-sm">{shippingData.city}, {shippingData.postalCode}</p>
                      <p className="text-muted-foreground text-sm">{shippingData.country}</p>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display text-sm text-muted-foreground">PAYMENT METHOD</h3>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-xs hover:underline"
                          style={{ color: `hsl(${themeInfo.colors.primary})` }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">•••• •••• •••• {paymentData.cardNumber.slice(-4)}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <h3 className="font-display text-sm text-muted-foreground mb-3">ORDER ITEMS</h3>
                      <ul className="space-y-3">
                        {items.map((item) => (
                          <li key={item.id} className="flex items-center gap-3">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            )}
                            <div className="flex-1">
                              <p className="text-foreground text-sm">{item.name}</p>
                              <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-foreground">{formatPrice(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={currentStep === 0 ? "invisible" : ""}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              {currentStep < 2 ? (
                <Button onClick={handleNext} className="text-white" style={{ background: themeInfo.colors.gradient }}>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="text-white min-w-[180px]"
                  style={{ background: themeInfo.colors.gradient }}
                >
                  {isProcessing ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Processing...
                    </motion.span>
                  ) : (
                    <>
                      全集中 • Place Order
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-dark rounded-2xl p-6 sticky top-24">
              <h2 className="font-brush text-xl mb-4">ORDER SUMMARY</h2>
              
              <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm" style={{ color: `hsl(${themeInfo.colors.primary})` }}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span style={{ color: `hsl(${themeInfo.colors.primary})` }}>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {totalPrice < 5000 && (
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Add {formatPrice(5000 - totalPrice)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useHashiraTheme, HashiraTheme, hashiraThemes } from "@/contexts/HashiraThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Sword, LogOut, Save, ArrowLeft } from "lucide-react";
import { z } from "zod";

const profileSchema = z.object({
  displayName: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
});

const Profile = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const { themeInfo, theme, setTheme } = useHashiraTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [favoriteHashira, setFavoriteHashira] = useState<HashiraTheme>("tanjiro");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setFavoriteHashira((profile.favorite_hashira as HashiraTheme) || "tanjiro");
    }
  }, [profile]);

  const handleSave = async () => {
    const validation = profileSchema.safeParse({ displayName });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await updateProfile({
      display_name: displayName,
      favorite_hashira: favoriteHashira,
    });

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTheme(favoriteHashira);
      toast({
        title: "Profile Updated!",
        description: "Your profile has been saved successfully.",
      });
    }
    setIsSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "Until we meet again, Demon Slayer!",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const hashiraOptions = Object.entries(hashiraThemes).slice(0, 6) as [HashiraTheme, typeof hashiraThemes[HashiraTheme]][];

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

      <div className="container relative z-10 max-w-2xl mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-dark rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: themeInfo.colors.gradient }}
            >
              {displayName?.charAt(0)?.toUpperCase() || "S"}
            </motion.div>
            <h1 className="font-brush text-3xl mb-2">Slayer Profile</h1>
            <p className="text-muted-foreground font-japanese">
              {themeInfo.japaneseName} • {themeInfo.title}
            </p>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                value={user?.email || ""}
                disabled
                className="bg-background/30 border-white/10 text-muted-foreground"
              />
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Display Name
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your slayer name"
                className="bg-background/50 border-white/10"
              />
            </div>

            {/* Favorite Hashira */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sword className="w-4 h-4" />
                Favorite Breathing Style
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hashiraOptions.map(([key, info]) => (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => setFavoriteHashira(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      favoriteHashira === key
                        ? "border-2"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    style={{
                      borderColor: favoriteHashira === key ? `hsl(${info.colors.primary})` : undefined,
                      background: favoriteHashira === key ? `hsl(${info.colors.primary} / 0.1)` : "hsl(var(--background) / 0.5)",
                    }}
                  >
                    <div
                      className="text-sm font-medium"
                      style={{ color: `hsl(${info.colors.accent})` }}
                    >
                      {info.name.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground font-japanese">
                      {info.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-6 font-display tracking-wider text-white border-0"
                style={{
                  background: themeInfo.colors.gradient,
                  boxShadow: `0 0 30px hsl(${themeInfo.colors.glow} / 0.4)`,
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="py-6 font-display tracking-wider border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Member info */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
            <p>
              Member since{" "}
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "..."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

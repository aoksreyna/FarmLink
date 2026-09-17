"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import { createClient } from "@/lib/supabase/client";

const AuthContext = createContext({
  openAuth: (mode = "login", role = "farmer") => {},
  closeAuth: () => {},
  user: null,
  profile: null,
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "login",
    role: "farmer",
  });

  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();
        setProfile(
          userProfile || {
            full_name: currentUser.email?.split("@")[0] || "User",
            role: "user",
          }
        );
      } else {
        setUser(null);
        setProfile(null);
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data: userProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(
            userProfile || {
              full_name: session.user.email?.split("@")[0] || "User",
              role: "user",
            }
          );
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const openAuth = (mode = "login", role = "farmer") => {
    setModalState({
      isOpen: true,
      mode,
      role,
    });
  };

  const closeAuth = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ openAuth, closeAuth, user, profile, signOut }}>
      {children}
      <AuthModal
        isOpen={modalState.isOpen}
        initialMode={modalState.mode}
        initialRole={modalState.role}
        onClose={closeAuth}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

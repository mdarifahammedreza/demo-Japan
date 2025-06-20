"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Private({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); //Thats not a best practice we consider it only emo purpose
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.replace("/login");
    }
  }, [router]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}

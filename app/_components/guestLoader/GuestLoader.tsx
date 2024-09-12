"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loader from "../loader/Loader";
import "./GuestLoader.scss";

const GuestLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Creating guest account...");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const createGuestAccount = async () => {
      try {
        setStatus("Creating guest account...");
        await delay(2000);
        const accountResponse = await fetch("/api/auth/guest", {
          method: "POST",
        });
        if (!accountResponse.ok) {
          throw new Error("Failed to create guest account");
        }
        const accountData = await accountResponse.json();

        setStatus("Signing in...");
        await delay(1500);
        const signInResult = await signIn("credentials", {
          username: accountData.username,
          password: accountData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error("Failed to sign in with guest account");
        }

        setStatus("Creating your starter cards...");
        await delay(2000);
        const createRandomCardsResponse = await fetch(
          "/api/cards/createRandom",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: accountData.username,
              numberOfCards: 10,
            }),
          }
        );

        if (!createRandomCardsResponse.ok) {
          console.error("Failed to create random cards for guest user");
          setStatus("Failed to create starter cards, but continuing...");
          await delay(2000);
        }

        setStatus("Redirecting to your collection...");
        await delay(2000);
        router.push("/Collection");
      } catch (error) {
        console.error("Error in guest account creation process:", error);
        setStatus("An error occurred. Redirecting to home...");
        await delay(2000);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    createGuestAccount();
  }, [router]);

  return (
    <div className="guestLoader">
      <Loader customText={status} />
    </div>
  );
};

export default GuestLoader;

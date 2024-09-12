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
        // Create guest account
        setStatus("Creating guest account...");
        await delay(2000); // 2 second delay
        const accountResponse = await fetch("/api/auth/guest", {
          method: "POST",
        });
        if (!accountResponse.ok) {
          throw new Error("Failed to create guest account");
        }
        const accountData = await accountResponse.json();

        // Sign in with the new guest account
        setStatus("Signing in...");
        await delay(1500); // 1.5 second delay
        const signInResult = await signIn("credentials", {
          username: accountData.username,
          password: accountData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error("Failed to sign in with guest account");
        }

        // Create random cards for the guest user
        setStatus("Creating your starter cards...");
        await delay(2000); // 2 second delay
        const createRandomCardsResponse = await fetch(
          "/api/cards/createRandom",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: accountData.username,
              numberOfCards: 5,
            }),
          }
        );

        if (!createRandomCardsResponse.ok) {
          console.error("Failed to create random cards for guest user");
          setStatus("Failed to create starter cards, but continuing...");
          await delay(2000); // 2 second delay
        }

        // Redirect to the collection page
        setStatus("Redirecting to your collection...");
        await delay(2000); // 2 second delay
        router.push("/Collection");
      } catch (error) {
        console.error("Error in guest account creation process:", error);
        setStatus("An error occurred. Redirecting to home...");
        await delay(2000); // 2 second delay
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

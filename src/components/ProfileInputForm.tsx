"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/hooks/useFirestore";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email(),
});

function ProfileInputForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { addDoc } = useFirestore();
  const { user } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (!user) {
        toast({
          variant: "destructive",
          title: "Uh-oh! You are not authenticated.",
          description: `Please login to save your profile.`,
        });
        throw new Error("User not authenticated");
      }
      await addDoc("users", user?.uid, values);

      toast({
        description: `Profile saved successfully!`,
      });
      setLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while saving your data.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
      throw new Error("Error saving profile");
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Full Name</FormLabel> */}
                <FormControl>
                  <Input placeholder='Abdullah Mohsin...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder='example@mail.com...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ProfileInputForm;

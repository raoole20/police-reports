'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  policeID: z.string().min(2, {
    message: "policeID must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policeID: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const result = await signIn("credentials", {
      policeID: values.policeID,
      password: values.password,
      redirect: false,
    })

    setLoading(false)
    if(!result) 
      return console.error("Failed to sign in")

    if(result.error) {
      console.error("Failed to sign in", result.error)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-11/12 m-auto md:w-1/2 lg:max-w-[500px]">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle>Police SQL</CardTitle>
          <CardDescription>Inicio de sesion</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="policeID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="password" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <Button type="submit" className="w-full" disabled={loading}> 
                {
                loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Iniciar Sesion'
                  )
                }
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full font-bold">Solo personal autorizado!</p>
        </CardFooter>
      </Card>
    </div>
  );
}

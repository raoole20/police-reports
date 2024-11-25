import { redirect } from "next/navigation";
export default async function app() {
  redirect('/dashboard/overview');
  return null
}

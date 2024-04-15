import Link from "next/link";

export default function NotFound() { 
  return (
    <div>
        <h2>Something went wrong!</h2>
        <Link href={"/"}>Go back to home page.</Link>
    </div>
  )
}
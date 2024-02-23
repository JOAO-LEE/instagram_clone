import Stories from "@/components/Aside/Feed/Stories/Stories";
import Sidebar from "../components/Aside/Sidebar";
import Feed from "@/components/Aside/Feed/Feed";
import  './globals.css'

export default function Home() {
  return ( 
    <div className="template">
      <div className="">
        <Sidebar />
      </div>
      <main className="">
        <Feed />
      </main>
    </div>
  )
}


{/* <main className="flex w-full">

<section className="">

</section>

{/* </main> */}
// </main> */}
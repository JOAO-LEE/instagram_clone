import Stories from "@/components/Feed/Stories/Stories";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import  './globals.css'

export default function Home() {
  return ( 
    <div className="template">
      <div className="">
        <Sidebar />
      </div>
      <main>
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
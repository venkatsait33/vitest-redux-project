import Navbar from "./Navbar"
import PostDisplay from "./PostDisplay"
import Sidebar from "./Sidebar"

function Layout() {
    return (
        <div className="">
            <Navbar />
            <div className="container flex max-w-screen-xl gap-4 mx-auto mt-2">
                <div className="w-[60%] h-full">

                    <PostDisplay />
                </div>
                <div className="w-[40%] h-full">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Layout
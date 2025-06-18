export default function Navbar() {
    return (
        <nav className="sticky top-0 left-0 w-full h-[4rem] bg-[#0C0C0C] text-white z-30" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center justify-between w-full">
                    <div className="text-lg font-bold">NextMovie</div>
                    <ul className="flex items-end-safe gap-6 text-sm font-medium">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

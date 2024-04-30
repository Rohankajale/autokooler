import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'



const Navbar = () => {
    return (
        <nav className="flex mx-8 my-10 flex-wrap justify-evenly">
            <h3 className="text-3xl font-bold mt-6">Autokooler</h3>
                <div menu menu-vetical bg-base-200 rounded-box mt-6>
                    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                        <li>
                            <a className="tooltip" data-tip="Home">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </a>
                        </li>
                        <li>
                            <a className="tooltip" data-tip="Info">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </a>
                        </li>
                        <li>
                            <a className="tooltip" data-tip="Status">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="stats shadow sm:flex-shrink">
        
                    <div className="stat place-items-center">
                        <div className="stat-title">Overall Orders</div>
                            <div className="stat-value">31K</div>
                        <div className="stat-desc">From January 1st to February 1st</div>
                    </div>
        
                    <div className="stat place-items-center">
                        <div className="stat-title">Recurring Customers</div>
                            <div className="stat-value">4,200</div>
                        <div className="stat-desc">↗︎ 40 (2%)</div>
                    </div>
        
                    <div className="stat place-items-center">
                        <div className="stat-title">Order Delivery Rate</div>
                            <div className="stat-value">100%</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
        
                </div>

                <header>
                    <SignedOut>
                        <SignInButton className="float-end btn btn-neutral sm:justify-end mt-7"/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </header>
                <SignedOut>
                <a href="#" class="snipcart-checkout btn btn-neutral sm:justify-end mt-7">Checkout</a>
                </SignedOut>
                {/* <button class="snipcart-customer-signin">My account</button> */}
        </nav>
                
    )
}   

export default Navbar
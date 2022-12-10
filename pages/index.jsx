import React, { useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
    return (
        <React.Fragment>
            <Head>
                <title>Taskage - Home</title>
            </Head>
            <Header />
            <HeroSection />
            <Feature />
            <Testimonials />
            <Footer />
        </React.Fragment>
    );
}

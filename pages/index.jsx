import React from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import Feature from "@/components/Feature/Feature";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";

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
